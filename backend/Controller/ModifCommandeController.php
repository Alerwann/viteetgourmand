<?php

namespace App\Controller;

use App\Repository\ModifCommande\ModifCommandeRepositoryInterface;
use App\Entity\ModifCommande;


class ModifCommandeController
{
    private ModifCommandeRepositoryInterface $modifRepo;

    public function __construct(ModifCommandeRepositoryInterface $modifRepo)
    {
        $this->modifRepo = $modifRepo;
    }

    public function getAll(): void
    {
        try {
            $modifs = $this->modifRepo->getAll();
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($modifs);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }



    public function save(): void
    {
        $data = \json_decode(file_get_contents("php://input"), true);

        if (!isset($data) || !isset($data['modif_description'], $data['modif_contact'], $data['commande_id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        }

        $modifData = new ModifCommande(
            modif_contact: $data['modif_contact'],
            modif_description: $data['modif_description'],
            commande_id: $data['commande_id'],
            modif_id: $data['modif_id'] ?? \null,
            modif_date: $data['modif_date'] ?? \null,

        );

        try {
            $this->modifRepo->save($modifData);
            http_response_code(201);
            echo json_encode([
                "message" => "Modification mis à jour avec succès !"
            ]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }
}
