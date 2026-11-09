<?php

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';


if ($origin === 'https://viteetgourmand.vercel.app' || preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

header("Content-Type: application/json; charset=UTF-8");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../config/db_init.php';

use App\Middleware\AuthMiddleware;

use App\Repository\Users\SqlUserRepository;

use App\Repository\Auth\SqlAuthRepository;

use App\Services\AuthService;
use App\Services\MailerService;



$userRepository = new SqlUserRepository($pdo);

$authRepo = new SqlAuthRepository($pdo);


$resend = Resend::client(getenv('API_RESEND'));
$mailerService = new MailerService($resend);
$authService = new AuthService($userRepository, $authRepo, $mailerService);
$authMiddleware = new AuthMiddleware($authService);
$userRepository = new SqlUserRepository($pdo);


$userId = $authMiddleware->handle();

try {
    $user = $userRepository->findById($userId);

    if (!$user || !$user->getIsActif()) {
        http_response_code(404);
        echo json_encode(["error" => "Utilisateur introuvable ou compte désactivé."]);
        exit;
    }

    // 4. On renvoie les données formatées pour le front React
    http_response_code(200);
    echo json_encode([
        "user" => [
            "id" => $user->getUtilisateurID(),
            "email" => $user->getEmail(),
            "prenom" => $user->getPrenom(),
            "nom" => $user->getNom(),
            "telephone" => $user->getTel(),
            "is_actif" => $user->getIsActif(),
            "role" => $user->getRoleNom()
        ]
    ]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
}
