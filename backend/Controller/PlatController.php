<?php

namespace App\Controller;

use App\Entity\Plat;
use App\Enum\TypePlat;
use App\Repository\Plat\PlatRepositoryInterface;

class PlatController
{
    private PlatRepositoryInterface $platRepo;

    public function __construct(PlatRepositoryInterface $platRepo)
    {
        $this->platRepo = $platRepo;
    }

    public function getAllPlat()
    {
        try {
            $plats = $this->platRepo->getAll();

            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($plats);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getPlatByType()
    {
        if (isset($_GET['type'])) {
            $type = $_GET['type'];
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        }


        try {
            $plats = $this->platRepo->getByType($type);
            http_response_code(200);
            echo json_encode($plats);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getById(): void
    {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        }


        try {
            $plats = $this->platRepo->getOne($id);
            http_response_code(200);
            echo json_encode($plats);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function save()
    {
        $plat_nom = $_POST['plat_nom'] ?? null;
        $type_plat = $_POST['type_plat'] ?? null;
        $alergenes = isset($_POST['alergenes']) ? json_decode($_POST['alergenes'], true) : [];
        $plat_id = !empty($_POST['plat_id']) ? (int)$_POST['plat_id'] : null;

        $typeEnum = TypePlat::tryFrom($type_plat);
        if ($typeEnum === null) {
            http_response_code(400);
            echo json_encode(["message" => "Statut invalide : " . $type_plat]);
            exit;
        }

        if (!$plat_nom || !$type_plat) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes (nom, type)."]);
            exit;
        }

        // Gestion de la photo au niveau du contrôleur
        $imageData = null;
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
            $imageData = file_get_contents($_FILES['photo']['tmp_name']);
        } elseif ($plat_id === null) {
            // Photo obligatoire uniquement à la création
            http_response_code(400);
            echo json_encode(["message" => "La photo est obligatoire pour la création."]);
            exit;
        }

        try {
            $plat = new Plat(
                plat_id: $plat_id,
                plat_nom: $plat_nom,
                type_plat: $typeEnum,
                photo: $imageData, // Soit le binaire de la nouvelle photo, soit null
                alergenes: $alergenes
            );

            $id = $this->platRepo->save($plat);

            http_response_code(201);
            echo json_encode([
                "message" => "Plat enregistré avec succès !",
                "plat_id" => $id
            ]);
            exit;
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
            exit;
        }
    }

    public function delete()
    {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        }


        try {
            $this->platRepo->delete($id);
            http_response_code(200);
            echo json_encode(["message" => "Plat supprimé"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
