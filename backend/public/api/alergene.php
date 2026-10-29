<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use App\Repository\Alergene\SqlAlergeneRepository;
use App\Controller\AlergeneController;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE OPTIONS");
header("Content-Type: application/json; charset=utf8mb4");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config/db_init.php';


$alergeneRepo = new SqlAlergeneRepository($pdo);
$controller = new AlergeneController($alergeneRepo);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {


    case 'GET':

        if (isset($_GET['id'])) {
            $controller->getOneById();
        } else {
            $controller->getAllalergene();
        }

        break;
    case 'POST':
        $controller->createAlergene();
        break;

    case 'DELETE':
        $controller->deleteOne();
        break;

    default:

        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}
