<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Repository\Commande\CommandeRepositoryInterface;


class CommandeController
{
    private CommandeRepositoryInterface $commandeRepo;

    public function __construct(CommandeRepositoryInterface $commandeRepo)
    {
        $this->commandeRepo = $commandeRepo;
    }

    private function createArray(Commande $commande): array
    {
        return [
            'commande_id' => $commande->getCommandeId(),
            'commande_ref' => $commande->getCommandeRef(),
            'nombre_personne' => $commande->getNombrePersonne(),
            'menu_id' => $commande->getMenuId(),
            'utilisateur_id' => $commande->getUtilisateurId(),
            'commande_presta' => $commande->getPresta(),
            'commande_status' => $commande->getStatus(),
            'commande_date' => $commande->getCommandeDate()
        ];
    }

    public function getAll(): void
    {
        try {
            $commandes = $this->commandeRepo->getAll();

            $data = \array_map(function ($commande) {
                $this->createArray($commande);
            }, $commandes);

            http_response_code(200);
            echo json_encode($data);
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
            $commande = $this->commandeRepo->getOne($id);
            $data = $this->createArray($commande);

            http_response_code(200);
            echo json_encode($data);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getOneByUtilisateurId(): void
    {
        if (!isset($_GET['utilisateur'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $utilisateur_id = $_GET['utilisateur'];
        }

        try {
            $commande = $this->commandeRepo->getByUtilisateurId($utilisateur_id);
            $data = $this->createArray($commande);

            http_response_code(200);
            echo json_encode($data);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function save(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        // A faire au repos
    }

    public function delete(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $commandeId = $_GET['id'];
        }
        try {
            $this->commandeRepo->delete($commandeId);
            http_response_code(200);
            echo json_encode(["message" => "Régime supprimé"]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }
}
