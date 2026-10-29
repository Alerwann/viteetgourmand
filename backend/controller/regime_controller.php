<?php

namespace App\Controller;

use App\Repository\RegimeRepositoryInterface;
use App\Entity\Regime;

require_once __DIR__ . '/../classes/Regime.php';

class Regime_controller
{
    private RegimeRepositoryInterface $regimeRepo;

    public function __construct(RegimeRepositoryInterface $regimeRepo)
    {
        $this->regimeRepo = $regimeRepo;
    }

    public function getAllRegime(): void
    {
        try {
            $regimes = $this->regimeRepo->getAll();
            http_response_code(200);
            echo json_encode($regimes);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }

    public function getOne(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $regimeId = $_GET['id'];
        }

        try {
            $regime = $this->regimeRepo->getOne($regimeId);
            http_response_code(200);
            echo json_encode($regime);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }

    public function save(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data) || !isset($data['nom_regime'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        }
        try {
            $newRegime = new Regime(regime_id: $data['regime_id'] ?? \null, nom_regime: $data['nom_regime']);
            $this->regimeRepo->save($newRegime);

            http_response_code(201);
            echo json_encode([
                "message" => "Régime mis à jour avec succès !"
            ]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }

    public function delete(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $regimeId = $_GET['id'];
        }
        try {
            $this->regimeRepo->delete($regimeId);
            http_response_code(200);
            echo json_encode(["message" => "Régime supprimé"]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }
}
