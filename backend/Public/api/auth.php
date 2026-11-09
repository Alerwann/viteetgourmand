<?php


$origin = $_SERVER['HTTP_ORIGIN'] ?? '';


if ($origin === 'https://viteetgourmand.vercel.app' || preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST,PUT, OPTIONS");
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

use App\Controller\AuthController;

$userRepository = new SqlUserRepository($pdo);

$authRepo = new SqlAuthRepository($pdo);


$resend = Resend::client(getenv('API_RESEND'));
$mailerService = new MailerService($resend);

$authService = new AuthService($userRepository, $authRepo, $mailerService);

$controller = new AuthController($authService);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'PUT':
        $controller->updatePassword();
        break;
    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        if (isset($input['password'])) {
            $controller->login();
        } else {
            $controller->requestPasswordReset();
        }
        break;
    default:

        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}
