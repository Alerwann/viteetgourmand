<?php

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';


if ($origin === 'https://viteetgourmand.vercel.app' || preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST,DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

header("Content-Type: application/json; charset=UTF-8");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
require_once __DIR__ . '/../../vendor/autoload.php';

require_once __DIR__ . '/../../config/db_init.php';

$userRepo = new SqlUserRepository($pdo);
$authRepo = new SqlAuthRepository($pdo);
$mailer = new MailerService();
$authService = new AuthService($userRepo, $authRepo, $mailer);


$authMiddleware = new AuthMiddleware($authService);
$userId = $authMiddleware->handle();
$user = $userRepo->findById($userId);


$commandeRepo = new SqlCommandeRepository($pdo);
$controller = new CommandeController($commandeRepo);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['utilisateur'])) {
            $controller->getOneByUtilisateurId();
        } else if (isset($_GET['id'])) {
            $controller->getOne();
        } else if ($user->getRoleId() == 1) {
            $controller->getAll();
        } else {
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "id" => $userId
            ]);
            exit;
        }
        break;
    case 'POST':
        $controller->save();
        break;
    case 'DELETE':
        $controller->delete();
        break;
    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}
