<?php

namespace App\Controller;

use App\Repository\Menu\MenuRepositoryInterface;




class MenuController
{
    private MenuRepositoryInterface $menuRepo;

    public function __construct(MenuRepositoryInterface $menuRepo)
    {
        $this->menuRepo = $menuRepo;
    }

    public function getAllMenus(): void
    {
        try {
            $menus = $this->menuRepo->findAll();

            $data = \array_map(function ($menu) {
                return [
                    'menu_id' => $menu->getMenuId(),
                    'menu_nom' => $menu->getTitle(),
                    'nb_perso_min' => $menu->getNbPersoMin(),
                    'menu_prix' => $menu->getPrix(),
                    'description' => $menu->getDescription(),
                    'quantite_restante' => $menu->getQuantite(),
                    'plat_id ' => $menu->getPlatId(),
                    'regime_id' => $menu->getRegimeId(),
                    'theme_id' => $menu->getThemeId(),
                    'note_particuliere' => $menu->getNoteParticuliere(),
                    'plats_details' => $menu->getPlatsDetails()
                ];
            }, $menus);

            http_response_code(200);
            echo json_encode($data);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getOneByID(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $id = $_GET['id'];
        }
        try {
            $menus = $this->menuRepo->findById($id);
            if ($menus == \null) {
                http_response_code(400);
                echo json_encode(["message" => "menu non trouvé"]);
                return;
            }

            http_response_code(200);
            echo json_encode($menus);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function createMenu(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);
        try {
            $new_id = $this->menuRepo->save($data);
        } catch (\Exception $e) {

            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode([
                "message" => "Erreur lors de la création du menu : " . $e->getMessage()
            ]);
            exit;
        }
    }

    public function deleteOne(): void {}
}
