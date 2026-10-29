<?php

namespace App\Controller;

use App\Repository\Avis\AvisRepositoryInterface;
use App\Enum\StatusAvis;


class AvisController
{

    private AvisRepositoryInterface $avisRepo;

    public function __construct(AvisRepositoryInterface $avisRepo)
    {
        $this->avisRepo = $avisRepo;
    }


    public function getAllAvis(): void
    {

        try {
            $listAvis = $this->avisRepo->findAll();

            http_response_code(200);
            echo json_encode($listAvis);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getSelectAvis(): void
    {
        $limite = isset($_GET['limite']) ? (int) $_GET['limite'] : 5;
        try {
            $listAvis = $this->avisRepo->findLastAvis($limite);

            http_response_code(200);
            echo json_encode($listAvis);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getAvisbyStatus(): void
    {
        $statusIN = isset($_GET['status']) ? $_GET['status'] : '';

        $statusEnum = StatusAvis::tryFrom($statusIN);

        if ($statusEnum === null) {
            throw new \InvalidArgumentException("Statut invalide : " . $statusIN);
        }

        try {
            $listAvis = $this->avisRepo->findByStatus($statusEnum);

            http_response_code(200);
            echo json_encode($listAvis);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function createAvis(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data) || !isset($data['description'], $data['status'], $data['note'], $data['commande_id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes ( description, status, note)."]);
            return;
        }

        $statusString = $data['status'] ?? 'cree';

        $statusEnum = StatusAvis::tryFrom($statusString);

        if ($statusEnum === null) {
            throw new \InvalidArgumentException("Statut invalide : " . $statusString);
        }

        try {
            $id = $this->avisRepo->save($data);
            http_response_code(201);
            echo json_encode([
                "message" => "Avis créé avec succès !",
                "id" => $id
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
