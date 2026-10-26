<?php

namespace App\Repository;

use App\Entity\Utilisateur;
use App\Entity\AdressePostale;
use PDO;

class SqlUserRepository implements UserRepositoryInterface
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function findById(int $id): ?Utilisateur
    {
        $stmt = $this->db->prepare("SELECT * FROM UTILISATEUR WHERE utilisateur_id = :id");
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data ? $this->hydrate($data) : null;
    }

    public function findByEmail(string $email): ?Utilisateur
    {
        $stmt = $this->db->prepare("SELECT * FROM UTILISATEUR WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data ? $this->hydrate($data) : null;
    }

    public function findAll(): array
    {
        $stmt = $this->db->query("SELECT * FROM UTILISATEUR");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $users = [];
        foreach ($rows as $data) {
            $users[] = $this->hydrate($data);
        }
        return $users;
    }

    public function save(Utilisateur $utilisateur): int
    {
        $adresse = $utilisateur->getAdressePostal();

        if ($utilisateur->getUtilisateurID() === null) {
            // INSERT (Création)
            $stmt = $this->db->prepare("
                INSERT INTO UTILISATEUR (email, password, prenom, nom, telephone, is_actif, role_id, numero_rue, street, ville, code_postal, pays) 
                VALUES (:email, :password, :prenom, :nom, :telephone, :is_actif, :role_id, :numero_rue, :street, :ville, :code_postal, :pays)
            ");
        } else {
            // UPDATE (Mise à jour)
            $stmt = $this->db->prepare("
                UPDATE UTILISATEUR SET 
                    email = :email, password = :password, prenom = :prenom, nom = :nom, 
                    telephone = :telephone, is_actif = :is_actif, role_id = :role_id, 
                    numero_rue = :numero_rue, street = :street, ville = :ville, 
                    code_postal = :code_postal, pays = :pays
                WHERE utilisateur_id = :id
            ");
        }

        $params = [
            'email' => $utilisateur->getEmail(),
            'password' => $utilisateur->getPasswordHash(),
            'prenom' => $utilisateur->getPrenom(),
            'nom' => $utilisateur->getNom(),
            'telephone' => $utilisateur->getTel(),
            'is_actif' => $utilisateur->getIsActif() ? 1 : 0,
            'role_id' => $utilisateur->getRoleId(),
            'numero_rue' => $adresse->getNumRue(),
            'street' => $adresse->getStreet(),
            'ville' => $adresse->getVille(),
            'code_postal' => $adresse->getCodePostal(),
            'pays' => $adresse->getPays(),
        ];

        if ($utilisateur->getUtilisateurID() !== null) {
            $params['id'] = $utilisateur->getUtilisateurID();
        }

        $stmt->execute($params);

        return $params['id'];
    }

    public function delete(int $id): void
    {
        $stmt = $this->db->prepare("DELETE FROM UTILISATEUR WHERE utilisateur_id = :id");
        $stmt->execute(['id' => $id]);
    }

    private function hydrate(array $data): Utilisateur
    {
        $adresse = new AdressePostale(
            $data['street'] ?? '',
            $data['ville'] ?? '',
            $data['pays'] ?? '',
            $data['numero_rue'] ?? null,
            $data['code_postal'] ?? null
        );

        return Utilisateur::fromDataBase(
            $data['email'],
            $data['password'],
            $data['prenom'],
            $data['nom'],
            $data['telephone'],
            $adresse,
            (bool)$data['is_actif'],
            (int)$data['role_id'],
            (int)$data['utilisateur_id']
        );
    }
}
