<?php
require_once __DIR__ . '/../../vendor/autoload.php';

use App\Repository\Regime\SqlRegimeRepository;
use App\Controller\RegimeController;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET,POST,DELETE, OPTIONS");
header("Content-Type: application/json; charset=utf8mb4");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config/db_init.php';


$regimeRepo = new SqlRegimeRepository($pdo);
$controller = new  RegimeController($regimeRepo);


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {


    case 'GET':
        if (isset($_GET['id'])) {
            $controller->getOne();
        } else {

            $controller->getAllRegime();
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
