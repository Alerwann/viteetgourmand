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
require_once __DIR__ . '/../../controller/regime_controller.php';
require_once __DIR__ . '/../../repository/regime/RegimeRepositoryInterface.php';
require_once __DIR__ . '/../../repository/regime/SqlRegimeRepository.php';

$regimeRepo = new App\Repository\SqlRegimeRepository($pdo);
$controller = new  App\Controller\Regime_controller($regimeRepo);


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {


    case 'GET':
        if (isset($_GET['id'])) {
            $controller->getOne();
        } else {

            $controller->getAllRegime();
        }
        $controller->getAllregime();

        break;

    default:

        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}
