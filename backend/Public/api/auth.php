<?php



use App\Repository\Users\SqlUserRepository;
use App\Repository\Auth\SqlAuthRepository;

use App\Services\AuthService;
use App\Services\MailerService;

use App\Controller\AuthController;



$userRepository = new SqlUserRepository($pdo);

$authRepo = new SqlAuthRepository($pdo);


$mailerService = new MailerService();

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
