<?php

namespace App\Controller;

use App\Repository\UserRepositoryInterface;
use App\Services\AuthService;
use App\Entity\Utilisateur;
use App\Entity\AdressePostale;



require_once __DIR__ . '/../classes/Utilisateur.php';
require_once __DIR__ . '/../classes/AdressePostale.php';
require_once __DIR__ . '/../service/auth_service.php';

class UtilisateurController
{

    private AuthService $authService;
    private UserRepositoryInterface $userRepository;


    public function __construct(UserRepositoryInterface $userRepository, AuthService $authService)
    {
        $this->userRepository = $userRepository;
        $this->authService = $authService;
    }


    public function getAllUtilisateurs(): void
    {
        try {
            $listUtilisateurs = $this->userRepository->findAll();

            $data = array_map(function ($user) {
                return [
                    'id' => $user->getUtilisateurID(),
                    'email' => $user->getEmail(),
                    'prenom' => $user->getPrenom(),
                    'nom' => $user->getNom(),
                    'telephone' => $user->getTel(),
                    'adresse' => $user->getAdressePostal(),
                    'is_actif' => $user->getIsActif(),
                    'role_id' => $user->getRoleId(),

                ];
            }, $listUtilisateurs);

            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($data);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getOneById(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $id = $_GET['id'];
        }
        try {
            $user = $this->userRepository->findById($id);
            if ($user == null) {
                http_response_code(404);
                echo json_encode(["message" => "Utilisateur inexistant"]);
                return;
            }
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($user->toArray());
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function createUtilisateur(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data) || !isset($data['email'], $data['password'], $data['prenom'], $data['nom'], $data['telephone'], $data['adresse_postale'], $data['role_id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        }

        try {

            $adresseData = $data['adresse_postale'];
            $adresse = new AdressePostale(
                $adresseData['street'] ?? '',
                $adresseData['ville'] ?? '',
                $adresseData['pays'] ?? '',
                $adresseData['numero_rue'] ?? null,
                $adresseData['code_postal'] ?? null
            );


            $utilisateur = Utilisateur::register(
                $data['email'],
                $data['password'],
                $data['prenom'],
                $data['nom'],
                $data['telephone'],
                $adresse,
                true,
                (int)$data['role_id']
            );


            $this->userRepository->save($utilisateur);

            http_response_code(201);
            echo json_encode([
                "message" => "Utilisateur créé avec succès !"
            ]);
        } catch (\InvalidArgumentException $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }

    public function updateOne(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $id =  $_GET['id'];
        }

        $data =  json_decode(file_get_contents("php://input"), true);

        try {
            $user = $this->userRepository->findById((int)$id);
            if (!$user) {
                http_response_code(404);
                echo json_encode(["message" => "Utilisateur non trouvé"]);
                return;
            }

            if (isset($data['email'])) $user->setEmail($data['email']);
            if (isset($data['prenom'])) $user->setPrenom($data['prenom']);
            if (isset($data['nom'])) $user->setNom($data['nom']);
            if (isset($data['telephone'])) $user->setTel($data['telephone']);
            if (isset($data['is_actif'])) $user->setIsActif((bool)$data['is_actif']);
            if (isset($data['role_id'])) $user->setRoleId((int)$data['role_id']);

            $this->userRepository->save($user);

            http_response_code(200);
            echo json_encode(["message" => "Utilisateur mis à jour avec succès"]);
        } catch (\InvalidArgumentException $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur"]);
        }
    }



    public function updatePassword(): void
    {
        $token = $_GET['token'] ?? null;
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$token || empty($data['password'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Token ou nouveau mot de passe manquant."]);
            return;
        }

        $success = $this->authService->updatePassword($token, $data['password']);

        if (!$success) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Token invalide ou expiré."]);
            return;
        }

        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Mot de passe mis à jour avec succès."]);
    }
}
