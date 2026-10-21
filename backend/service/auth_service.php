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


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
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


        $userObj = new Utilisateur(
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

    public function login(string $email, string $password): ?array
    {
        $user = $this->findOneByEmail($email);
        if ($user == \null) {
            return [];
        }

        $hashPassword = $user->getPasswordHash();


        if (!\password_verify($password, $hashPassword)) {
            return [];
        }

        $statutUser = $user->getIsActif();

        if (!$statutUser) {
            return [];
        }

        return [$user->toArray()];
    }


    public function create_token(string $email): string
    {
        $user = $this->findOneByEmail($email);
        if ($user == null) {
            return "";
        }

        $userId = $user->getUtilisateurId();


        $stmtCheck = $this->pdo->prepare("SELECT tentatives, expire_at FROM password_reset_token WHERE utilisateur_id = :utilisateur_id");
        $stmtCheck->execute([':utilisateur_id' => $userId]);
        $existing = $stmtCheck->fetch(PDO::FETCH_ASSOC);

        $token = bin2hex(random_bytes(32));
        $date = new DateTime();
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

        return $token;
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

    public function delete_token(string $token): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM  password_reset_token WHERE token = :token");
        $stmt->execute([':token' => $token]);
    }
}
