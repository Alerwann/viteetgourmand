<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=utf8mb4");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config/db_init.php';
require_once __DIR__ . '/../../controller/menus_controller.php';

$controller = new MenuController($pdo);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {


    case 'GET':
        if (isset($_GET['id'])) {
            $controller->getOneByID();
        } else {
            $controller->getAllMenus();
        }
        break;

    default:

        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}
