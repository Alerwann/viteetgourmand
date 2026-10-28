<?php



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST,DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/db_init.php';
require_once __DIR__ . '/../../repository/plat/PlatRepositoryInterface.php';
require_once __DIR__ . '/../../repository/plat/SqlPlatRepository.php';
require_once __DIR__ . '/../../controller/plat_controller.php';

$platRepo = new App\Repository\SqlPlatRepository($pdo);
$controller = new app\Controller\PlatController($platRepo);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['type'])) {
            $controller->getPlatByType();
        } else if (isset($_GET['id'])) {
            $controller->getById();
        } else {
            $controller->getAllPlat();
        }

        break;
    case 'POST':
        $controller->save();
        break;

    case 'DELETE':
        $controller->delete();
        break;

    default:

        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}
