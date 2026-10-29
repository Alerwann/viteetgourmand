<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use \App\Repository\Users\SqlUserRepository;
use App\Services\AuthService;
use App\Services\MailerService;
use App\Controller\UtilisateurController;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS");
header("Content-Type: application/json; charset=utf8mb4");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config/db_init.php';


$userRepository = new SqlUserRepository($pdo);
$authService = new AuthService($pdo);
$mailerService = new MailerService();


$controller = new UtilisateurController($userRepository, $authService, $mailerService);

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
        } else {
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
