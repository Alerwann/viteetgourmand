<?php

use App\Repository\AlergeneRepositoryInterface;
use App\Entity\Alergene;

require_once __DIR__ . '/../classes/Alergene.php';

class AlergeneController
{
    public AlergeneRepositoryInterface $alergenerepo;

    public function __construct(AlergeneRepositoryInterface $alergenerepo)
    {
        $this->alergenerepo = $alergenerepo;
    }

    public function  getAllalergene(): void
    {
        try {
            $alergenes = $this->alergenerepo->findAll();

            http_response_code(200);
            echo json_encode($alergenes);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getOneById(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $id = $_GET['id'];
        }

        try {
            $alergene = $this->alergenerepo->findById($id);

            if ($alergene == null) {
                http_response_code(404);
                echo json_encode(["message" => "Alergene inexistant"]);
                return;
            }
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($alergene);
        } catch (\Throwable $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function createAlergene(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data) || isset($data['alergene_id'], $data['alergene_nom'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        }

        try {
            $alergene = new Alergene(
                $data['alergene_id'] ?? null,
                $data['alergene_nom']
            );
            $this->alergenerepo->createOne($alergene);

            http_response_code(201);
            echo json_encode([
                "message" => "Alergene créé avec succès !"
            ]);
        } catch (\InvalidArgumentException $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }

    public function deleteOne(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $id = $_GET['id'];
        }

        try {
            $this->alergenerepo->deleteOne($id);
            http_response_code(20);
            echo json_encode([
                "message" => "Alergene supprimé avec succès !"
            ]);
        } catch (\InvalidArgumentException $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }
}
