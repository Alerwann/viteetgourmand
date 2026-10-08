<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

header("Content-Type: application/json; charset=UTF-8");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/db_init.php';
require_once __DIR__ . '/../../controller/avis_controller.php';


$controller = new AvisController($pdo);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['limite'])) {
            $controller->getSelectAvis();
        } else if (isset($_GET['status'])) {
            $controller->getAvisbyStatus();
        } else {
            $controller->getAllAvis();
        }
        break;

    case 'POST':
        $controller->createAvis();
        break;

    default:

        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}
