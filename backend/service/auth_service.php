<?php

namespace App\Services;

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



    // public function updatePassword(int $userId, string $oldPassword, string $newPassword): bool
    // {
    //     // Logique de modification de mot de passe
    // }
}
