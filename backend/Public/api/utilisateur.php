<?php


$origin = $_SERVER['HTTP_ORIGIN'] ?? '';


if ($origin === 'https://viteetgourmand.vercel.app' || preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST,PUT, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

header("Content-Type: application/json; charset=UTF-8");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../config/db_init.php';

use App\Repository\Users\SqlUserRepository;
use App\Repository\Auth\SqlAuthRepository;

use App\Services\AuthService;
use App\Services\MailerService;

use App\Controller\UtilisateurController;



$authRepo = new SqlAuthRepository($pdo);
$userRepository = new SqlUserRepository($pdo);

$resend = Resend::client(getenv('API_RESEND'));
$mailerService = new MailerService($resend);

$authService = new AuthService($userRepository, $authRepo, $mailerService);

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
