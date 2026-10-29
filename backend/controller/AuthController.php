<?php

namespace App\Controllers;

use App\Services\AuthService;
use PDO;

class AuthController
{
    private AuthService $authService;

    public function __construct(PDO $pdo)
    {
        $this->authService = new AuthService($pdo);
    }

    // 1. Connexion
    public function login(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Email et mot de passe requis."]);
            return;
        }

        $result = $this->authService->login($data['email'], $data['password']);

        http_response_code($result['code']);
        echo json_encode($result);
    }

    // 2. Déconnexion
    public function logout(): void
    {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Token manquant."]);
            return;
        }

        $token = $matches[1];
        $this->authService->logout($token);

        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Déconnexion réussie."]);
    }

    // 3. Demande de réinitialisation de mot de passe (Envoi du mail)
    public function requestPasswordReset(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['email'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "L'email est requis."]);
            return;
        }

        try {
            $this->authService->create_user_token($data['email']);

            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Si l'email existe, un lien de réinitialisation a été envoyé."
            ]);
        } catch (\Exception $e) {
            http_response_code(429);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
    }

    // 4. Mise à jour du mot de passe via le token reçu par mail
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
