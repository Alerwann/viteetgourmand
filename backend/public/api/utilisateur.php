<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS");
header("Content-Type: application/json; charset=utf8mb4");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. Inclusion des fichiers nécessaires (ou via Composer)
require_once __DIR__ . '/../../config/db_init.php';
require_once __DIR__ . '/../../repository/users/SqlUserRepositoryInterface.php';
require_once __DIR__ . '/../../service/auth_service.php';
require_once __DIR__ . '/../../controller/utilisateur_controller.php';

// 2. Initialisation des dépendances
$userRepository = new \App\Repository\SqlUserRepository($pdo);
$authService = new \App\Services\AuthService($pdo);

// 3. Injection dans le contrôleur
$controller = new \App\Controller\UtilisateurController($userRepository, $authService);

$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $controller->getOneById();
        } else {
            $controller->getAllUtilisateurs();
        }
        break;

    case 'POST':

        if (isset($_GET['token'])) {
            $controller->updatePassword();
        } else if (isset($_GET['id'])) {
            $controller->updateOne();
        }
        // Sinon, c'est une création
        else {
            $controller->createUtilisateur();
        }
        break;

    case 'PUT':

        if (isset($_GET['id'])) {
            $controller->updateOne();
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}
