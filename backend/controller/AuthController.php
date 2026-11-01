<?php

namespace App\Controller;

use App\Services\AuthService;

class AuthController
{
    private AuthService $authService;


    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

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

    public function requestPasswordReset(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['email'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "L'email est requis."]);
            return;
        }

        try {
            // Le service gère la recherche en BDD, les tentatives, le token et le mail
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
