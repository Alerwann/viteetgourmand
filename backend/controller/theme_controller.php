<?php

namespace App\Controller;

use App\Repository\ThemeRepositoryInterface;
use App\Entity\Theme;

require_once __DIR__ . '/../classes/Theme.php';

class Theme_controller
{
    private ThemeRepositoryInterface $themeRepo;

    public function __construct(ThemeRepositoryInterface $themeRepo)
    {
        $this->themeRepo = $themeRepo;
    }

    public function getAllTheme(): void
    {
        try {
            $themes = $this->themeRepo->getAll();

            http_response_code(200);
            echo json_encode($themes);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getThemeById(): void
    {
        $id = isset($_GET['id']) ? $_GET['id'] : 1;
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        }
        try {
            $row = $this->themeRepo->getOne($id);

            if (!$row) {
                http_response_code(404);
                echo json_encode(["message" => "Thème non trouvé"]);
                return;
            }
            http_response_code(200);
            echo json_encode($row);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function save(): void
    {

        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data) || !isset($data['theme_nom'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        }
        try {
            $newTheme = new Theme(theme_id: $data['regime_id'] ?? \null, theme_nom: $data['nom_regime']);
            $this->themeRepo->save($newTheme);

            http_response_code(201);
            echo json_encode([
                "message" => "Thème mis à jour avec succès !"
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
            $themeId = $_GET['id'];
        }
        try {
            $this->themeRepo->delete($themeId);
            http_response_code(200);
            echo json_encode(["message" => "thème supprimé"]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }
}
