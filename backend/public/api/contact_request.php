<?php
header("Access-Control-Allow-Origin: *"); // Adapte selon ton port React
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config/db_init.php';
require_once __DIR__ . '/../../controller/contact_request_controller.php';

$controller = new ContactRequestcontroller($pdo);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {


    case 'POST':

        $controller->postRequest();
        break;

    default:

        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}
