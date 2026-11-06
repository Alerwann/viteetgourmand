<?php

namespace App\Controller;

use App\Repository\Horaire\HoraireRepositoryInterface;




class HoraireController
{
    private HoraireRepositoryInterface $horaireRepo;
    public function __construct(HoraireRepositoryInterface $horaireRepo)
    {
        $this->horaireRepo = $horaireRepo;
    }

    public function getAll(): void
    {

        try {
            $horaires = $this->horaireRepo->getAll();

            http_response_code(200);
            echo json_encode($horaires);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getOne(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $id = $_GET['id'];
        }

        try {
            $horaire = $this->horaireRepo->getOne($id);
            http_response_code(200);
            echo json_encode($horaire);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function updateHoraires(): void
    {

        $data = json_decode(file_get_contents("php://input"), true);


        if (empty($data)) {
            http_response_code(400);
            echo json_encode(["message" => "Données vide."]);
            return;
        }


        try {
            foreach ($data as $horaire) {
                if (!isset($horaire['horaire_id'], $horaire['jour'], $horaire['heure_ouverture'], $horaire['heure_fermeture'])) {
                    http_response_code(400);
                    echo json_encode(["message" => "Données incomplètes (jour, heure d'ouverture, heure de fermeture)."]);
                    return;
                }
                $this->horaireRepo->updateHoraire($horaire);
            }
            http_response_code(200);
            echo json_encode([
                "message" => "Horaire mis à jour avec succès !",
                "jour" => $data['jour']
            ]);
        } catch (Exception $e) {

            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
