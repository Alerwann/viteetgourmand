<?php

namespace App\Middleware;

use App\Services\AuthService;

class AuthMiddleware
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function handle(): int
    {
        // Récupération des headers de la requête
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        // Vérification du format "Bearer <token>"
        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            http_response_code(401);
            echo json_encode(["error" => "Token manquant ou format invalide."]);
            exit;
        }

        $token = $matches[1];

        // Validation du JWT via le service
        $userId = $this->verifyJwt($token);

        if (!$userId) {
            http_response_code(401);
            echo json_encode(["error" => "Token invalide ou expiré."]);
            exit;
        }

        return $userId;
    }


    public function verifyJwt(string $token): ?int
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$base64Header, $base64Payload, $base64Signature] = $parts;

        $secretKey = getenv('JWT_KEY');
        $signature = hash_hmac('sha256', "$base64Header.$base64Payload", $secretKey, true);
        $expectedSignature = $this->authService->base64UrlEncode($signature);


        if (!hash_equals($expectedSignature, $base64Signature)) {
            return null;
        }

        $payload = json_decode(base64_decode(strtr($base64Payload, '-_', '+/')), true);

        if (!$payload || !isset($payload['exp']) || !isset($payload['sub'])) {
            return null;
        }

        if ($payload['exp'] < time()) {
            return null;
        }

        return (int) $payload['sub'];
    }
}
