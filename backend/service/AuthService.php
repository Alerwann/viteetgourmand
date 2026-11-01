<?php

namespace App\Services;

use App\Repository\Users\UserRepositoryInterface;
use App\Repository\Auth\AuthRepositoryInterface;
use App\Services\MailerService;

class AuthService
{
    private UserRepositoryInterface $userRepo;
    private AuthRepositoryInterface $authRepo;
    private MailerService $mailer;

    public function __construct(
        UserRepositoryInterface $userRepo,
        AuthRepositoryInterface $authRepo,
        MailerService $mailer
    ) {
        $this->userRepo = $userRepo;
        $this->authRepo = $authRepo;
        $this->mailer = $mailer;
    }

    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
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

        $secretKey = getenv('JWT_KEY');
        $signature = hash_hmac('sha256', "$base64Header.$base64Payload", $secretKey, true);
        $base64Signature = $this->base64UrlEncode($signature);

        return "$base64Header.$base64Payload.$base64Signature";
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
        $expectedSignature = $this->base64UrlEncode($signature);

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

    public function login(string $email, string $plainPassword): array
    {
        $user = $this->userRepo->findByEmail($email);

        if (!$user || !password_verify($plainPassword, $user->getPasswordHash())) {
            return ["success" => false, "error" => "INVALID_CREDENTIALS", "code" => 401];
        }

        if (!$user->getIsActif()) {
            return ["success" => false, "error" => "ACCOUNT_INACTIVE", "code" => 403];
        }

        $token = $this->calcul_token($user->getUtilisateurID());

        return ["success" => true, "token" => $token, "code" => 200];
    }

    public function create_user_token(string $email): string
    {
        $user = $this->userRepo->findByEmail($email);
        if ($user == null) {
            return "";
        }

        $userId = $user->getUtilisateurId();
        $resetData = $this->authRepo->getOne($email);

        if ($resetData && $resetData->getTentative() >= 3) {
            throw new \Exception("Trop de demandes de réinitialisation. Veuillez réessayer plus tard.");
        }

        $token = $this->calcul_token($userId);

        if ($resetData) {
            $this->authRepo->update_reset_token($userId, $token);
        } else {
            $this->authRepo->create($userId, $token);
        }

        $resetLink = "http://localhost:5173/reinit/" . $token;
        $this->mailer->sendPasswordResetEmail($user->getEmail(), $resetLink);

        return $token;
    }

    public function updatePassword(string $token, string $newPlainPassword): bool
    {
        // 1. Vérification cryptographique du JWT du token de réinit
        $userId = $this->verifyJwt($token);
        if (!$userId) {
            return false;
        }

        // 2. Hashage et mise à jour via le repository user
        $newPasswordHash = password_hash($newPlainPassword, PASSWORD_DEFAULT);
        // $this->userRepo->($userId, $newPasswordHash);

        // 3. Suppression du token de réinitialisation utilisé
        $this->authRepo->delete_reset_token($userId);

        return true;
    }
}
