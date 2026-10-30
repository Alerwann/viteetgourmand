<?php

namespace App\Services;

use PDO;
use App\Services\MailerService;
use App\Entity\Utilisateur;
use App\Entity\AdressePostale;





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


    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=️');
    }

    public function calcul_token(int $userId): string
    {

        $header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);


        $payload = json_encode([
            'sub' => $userId,
            'iat' => time(),
            'exp' => time() + 3600
        ]);


        $base64Header = $this->base64UrlEncode($header);
        $base64Payload = $this->base64UrlEncode($payload);


        $secretKey = getenv('MYSQL_DATABASE');
        $signature = hash_hmac('sha256', "$base64Header.$base64Payload", $secretKey, true);
        $base64Signature = $this->base64UrlEncode($signature);


        return "$base64Header.$base64Payload.$base64Signature";
    }


    public function create_user_token(string $email): string
    {
        $user = $this->findOneByEmail($email);
        if ($user == null) {
            return "";
        }

        $userId = $user->getUtilisateurId();


        $stmtCheck = $this->pdo->prepare("SELECT tentatives FROM password_reset_token WHERE utilisateur_id = :utilisateur_id");
        $stmtCheck->execute([':utilisateur_id' => $userId]);
        $existing = $stmtCheck->fetch(PDO::FETCH_ASSOC);



        if ($existing && $existing['tentatives'] >= 3) {
            throw new \Exception("Trop de demandes de réinitialisation. Veuillez réessayer plus tard.");
        }

        $token = $this->calcul_token($userId);

        if ($existing) {
            $stmt = $this->pdo->prepare("UPDATE password_reset_token 
                                           SET token = :token,                                 
                                               tentatives = tentatives + 1 
                                           WHERE utilisateur_id = :utilisateur_id");
        } else {

            $stmt = $this->pdo->prepare("INSERT INTO password_reset_token (token, tentatives, utilisateur_id) 
                                           VALUES (:token, 1, :utilisateur_id)");
        }

        $stmt->execute([
            ':token' => $token,
            ':utilisateur_id' => $userId
        ]);

        $resetLink = "http://localhost:5173/reinit/" . $token;
        $this->mailer->sendPasswordResetEmail($user->getEmail(), $resetLink);

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

        $token = $this->calcul_token($user->getUtilisateurID());

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
