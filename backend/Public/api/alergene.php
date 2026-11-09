<?php





use App\Repository\Alergene\SqlAlergeneRepository;
use App\Controller\AlergeneController;

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
