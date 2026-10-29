<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use App\Controller\AuthController;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST,DELETE,PUT, OPTIONS");
header("Content-Type: application/json; charset=utf8mb4");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config/db_init.php';


$controller = new AuthController($pdo);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'DELETE':
        $controller->logout();
        break;
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
