<?php

namespace App\Services;

use DateTime;
use DateInterval;
use PDO;

require_once __DIR__ . '/../classes/Utilisateur.php';
require_once __DIR__ . '/../classes/AdressePostale.php';



class AuthService
{
    private PDO $pdo;
    private MailerService $mailer;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->mailer = new MailerService();
    }



    private function findOneByEmail(string $email): ?Utilisateur
    {
        $stmt = $this->pdo->prepare("SELECT utilisateur_id, email, password, prenom, nom, telephone, numero_rue, street, code_postal, ville, pays, is_actif, role_id FROM utilisateur WHERE email=:email");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return null;
        }

        $adresse = new AdressePostale(
            street: $row['street'],
            ville: $row['ville'],
            pays: $row['pays'],
            numero_rue: $row['numero_rue'] !== null ? (int)$row['numero_rue'] : null,
            code_postal: $row['code_postal'] !== null ? (int)$row['code_postal'] : null
        );


        $userObj =  Utilisateur::fromDataBase(
            email: $row['email'],
            password: $row['password'],
            prenom: $row['prenom'],
            nom: $row['nom'],
            telephone: $row['telephone'],
            adresse_postale: $adresse,
            is_actif: (bool)$row['is_actif'],
            role_id: (int)$row['role_id'],
            utilisateur_id: (int)$row['utilisateur_id']

        );

        return $userObj;
    }


    public function calcul_token(): array
    {
        $date = new DateTime();

        $token = bin2hex(random_bytes(32));

        return ["token" => $token, "date" => $date];
    }



    public function create_user_token(string $email): string
    {
        $user = $this->findOneByEmail($email);
        if ($user == null) {
            return "";
        }

        $userId = $user->getUtilisateurId();


        $stmtCheck = $this->pdo->prepare("SELECT tentatives, expire_at FROM password_reset_token WHERE utilisateur_id = :utilisateur_id");
        $stmtCheck->execute([':utilisateur_id' => $userId]);
        $existing = $stmtCheck->fetch(PDO::FETCH_ASSOC);

        $calcul_token = $this->calcul_token();

        $token = $calcul_token['token'];
        $date = $calcul_token['date'];

        $date->add(new DateInterval('PT15M'));
        $expireFormatted = $date->format('Y-m-d H:i:s');

        if ($existing) {

            if ($existing['tentatives'] >= 3) {
                throw new \Exception("Trop de demandes de réinitialisation. Veuillez réessayer plus tard.");
            }


            $stmtUpdate = $this->pdo->prepare("UPDATE password_reset_token 
                                           SET token = :token, 
                                               expire_at = :expire_at, 
                                               tentatives = tentatives + 1 
                                           WHERE utilisateur_id = :utilisateur_id");
            $stmtUpdate->execute([
                ':token' => $token,
                ':expire_at' => $expireFormatted,
                ':utilisateur_id' => $userId
            ]);
        } else {

            $stmtInsert = $this->pdo->prepare("INSERT INTO password_reset_token (token, expire_at, tentatives, utilisateur_id) 
                                           VALUES (:token, :expire_at, 1, :utilisateur_id)");
            $stmtInsert->execute([
                ':token' => $token,
                ':expire_at' => $expireFormatted,
                ':utilisateur_id' => $userId
            ]);
        }
        $resetLink = "http://localhost:5173/reset-password?token=" . $token;
        $this->mailer->sendPasswordResetEmail($user->getEmail(), $resetLink);

        return $token;
    }

    private function save_session_token(int $id): string
    {
        $tokendata = $this->calcul_token();
        $token = $tokendata['token'];
        $date = $tokendata['date'];
        $expireDate = clone $date;
        $expireDate->add(new DateInterval('P7D'));
        $expireFormatted = $expireDate->format('Y-m-d H:i:s');

        $stmtInsert = $this->pdo->prepare("INSERT INTO session_token (token, expire_at, utilisateur_id) 
                                           VALUES (:token, :expire_at, :utilisateur_id)");
        $stmtInsert->execute([
            ':token' => $token,
            ':expire_at' => $expireFormatted,
            ':utilisateur_id' => $id
        ]);
        return $token;
    }

    public function login(string $email, string $plainPassword): array
    {
        $user = $this->findOneByEmail($email);

        if (!$user || !password_verify($plainPassword, $user->getPasswordHash())) {
            return ["success" => false, "error" => "INVALID_CREDENTIALS", "code" => 401];
        }

        if (!$user->getIsActif()) {
            return ["success" => false, "error" => "ACCOUNT_INACTIVE", "code" => 403];
        }

        $token = $this->save_session_token($user->getUtilisateurID());

        return ["success" => true, "token" => $token, "code" => 200];
    }
    public function logout(string $token): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM session_token WHERE token = :token");
        $stmt->execute([':token' => $token]);
    }

    public function verifyToken(string $token): ?int
    {
        $stmt = $this->pdo->prepare("SELECT utilisateur_id, expire_at FROM session_token WHERE token = :token");
        $stmt->execute([':token' => $token]);
        $session = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$session) {
            return null;
        }


        $expireDate = new \DateTime($session['expire_at']);
        if ($expireDate < new \DateTime()) {

            $this->logout($token);
            return null;
        }

        return (int) $session['utilisateur_id'];
    }


    public function verif_auth_update(string $token): ?int
    {
        $stmt = $this->pdo->prepare("SELECT tentatives, expire_at, utilisateur_id FROM password_reset_token WHERE token = :token");
        $stmt->execute([':token' => $token]);
        $auth_data = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$auth_data) {
            return null;
        }

        $expireDate = new \DateTime($auth_data['expire_at']);
        $now_date = new \DateTime();

        if ($expireDate < $now_date) {
            return null;
        }

        return (int) $auth_data['utilisateur_id'];
    }

    public function delete_user_token(string $token): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM  password_reset_token WHERE token = :token");
        $stmt->execute([':token' => $token]);
    }

    public function updatePassword(string $token, string $newPlainPassword): bool
    {
        $userId = $this->verif_auth_update($token);
        if (!$userId) {
            return false;
        }

        // Hashage sécurisé du nouveau mot de passe
        $newPasswordHash = password_hash($newPlainPassword, PASSWORD_DEFAULT);

        $stmt = $this->pdo->prepare("UPDATE utilisateur SET password = :password WHERE utilisateur_id = :utilisateur_id");
        $stmt->execute([
            ':password' => $newPasswordHash,
            ':utilisateur_id' => $userId
        ]);

        // Suppression du token utilisé
        $this->delete_user_token($token);

        return true;
    }
}
