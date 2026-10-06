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
require_once __DIR__ . '/../../controller/horaire_controller.php';
require_once __DIR__ . '/../../classes/Horaire.php';

$controller = new HoraireController($pdo);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $horaires = $controller->getAll();
            http_response_code(200);
            echo json_encode($horaires);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $e->getMessage()]);
        }
        break;

   case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data) || !isset($data['jour'])) {
            http_response_code(400); // 400 Bad Request
            echo json_encode(["message" => "Données invalides ou incomplètes."]);
            break;
        }

        try {
            $result = $controller->saveOrUpdate($data);
            http_response_code(200);
            echo json_encode($result);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur base de données : " . $e->getMessage()]);
        }
        break;

    default:
 
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée."]);
        break;
}