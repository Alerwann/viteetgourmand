<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/db_init.php';
require_once __DIR__ . '/../../controller/plat_controller.php';

$controller = new PlatController($pdo);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['type'])) {
            $controller->getPlatByType();
        } else {
            $controller->getAllPlat();
        }

        break;

    case 'POST':
        $controller->createPlat();
    case 'PUT':
        $controller->updatePlat();

    default:

        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}
