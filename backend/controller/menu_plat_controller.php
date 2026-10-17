<?php

class MenuPlatController
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }



    public function getPlatByMenuId()
    {
        $id = isset($_GET['id']) ? $_GET['id'] : "AUCUN";

        try {
            $stmt = $this->pdo->prepare("SELECT plat_id,menu_id FROM menu_plat WHERE menu_id= :id");
            $stmt->bindValue(':id', $id->value, PDO::PARAM_STR);
            $stmt->execute();

            $menu_plats = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $menuPlatArray = [
                    "plat_id" => $row['plat_id'],
                    "menu_id" => $row['menu_id'],
                ];

                $menu_plats[] = $menuPlatArray;
            }
            http_response_code(200);
            echo json_encode($menu_plats);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
