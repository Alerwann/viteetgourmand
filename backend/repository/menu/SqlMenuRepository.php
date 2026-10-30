<?php

namespace App\Repository\Menu;

use App\Entity\Menu;
use App\Repository\Menu\MenuRepositoryInterface;
use Override;
use PDO;



class SqlMenuRepository implements MenuRepositoryInterface
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }


    public function findAll(): array

    {

        $sql = "SELECT 
            m.menu_id,
            m.menu_nom AS menu_menu_nom,
            m.nb_perso_min,
            m.menu_prix,
            m.description,
            m.quantite_restante,
            m.note_particuliere,
            m.regime_id,
            m.theme_id,
            r.regime_nom,   
            t.theme_nom,
            p.plat_id,
            p.plat_nom,
            p.type_plat,
            p.photo,
            a.alergene_id,
            a.alergene_nom
        FROM menu m
        JOIN regime r ON m.regime_id = r.regime_id
        JOIN theme t ON m.theme_id = t.theme_id
        LEFT JOIN menu_plat mp ON m.menu_id = mp.menu_id
        LEFT JOIN plat p ON mp.plat_id = p.plat_id
        LEFT JOIN plat_alergene pa ON p.plat_id = pa.plat_id
        LEFT JOIN alergene a ON pa.alergene_id = a.alergene_id";

        $stmt = $this->db->query($sql);


        $menus = $this->hydrateMenus($stmt);

        return $menus;
    }

    public function findById(int $menuId): ?Menu
    {
        $sql = "SELECT 
            m.menu_id,
            m.menu_nom AS menu_menu_nom,
            m.nb_perso_min,
            m.menu_prix,
            m.description,
            m.quantite_restante,
            m.note_particuliere,
            m.regime_id,  
            m.theme_id,    
            r.regime_nom,   
            t.theme_nom,
            p.plat_id,
            p.plat_nom,
            p.type_plat,
            p.photo,
            a.alergene_id,
            a.alergene_nom
        FROM menu m
        JOIN regime r ON m.regime_id = r.regime_id
        JOIN theme t ON m.theme_id = t.theme_id
        LEFT JOIN menu_plat mp ON m.menu_id = mp.menu_id
        LEFT JOIN plat p ON mp.plat_id = p.plat_id
        LEFT JOIN plat_alergene pa ON p.plat_id = pa.plat_id
        LEFT JOIN alergene a ON pa.alergene_id = a.alergene_id
        WHERE m.menu_id = ?";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([$menuId]);
        $menus = $this->hydrateMenus($stmt);
        return !empty($menus) ? $menus[0] : null;
    }


    public function save(Menu $menu): int
    {
        $this->db->beginTransaction();

        $sqlMenu = "INSERT INTO menu (menu_nom, nb_perso_min, menu_prix, description, quantite_restante, note_particuliere, regime_nom, theme_id) 
                    VALUES (:menu_nom, :nb_min, :prix, :desc, :qte, :note, :regime_nom, :theme_id)";

        $stmtMenu = $this->db->prepare($sqlMenu);
        $stmtMenu->execute([
            ':menu_nom'     => $menu->getMenuNom(),
            ':nb_min'    => $menu->getNbPersoMin(),
            ':prix'      => $menu->getPrix(),
            ':desc'      => $menu->getDescription(),
            ':qte'       => $menu->getQuantite(),
            ':note'      => $menu->getNoteParticuliere(),
            ':regime_nom' => $menu->getRegimeNom(),
            ':theme_id'  => $menu->getThemeNom()
        ]);

        $menuId = $this->db->lastInsertId();
        $arrayPlats = $menu->getPlatId();

        if (!empty($arrayPlats)) {
            $sqlPlat = "INSERT INTO menu_plat (menu_id, plat_id) VALUES (:menu_id, :plat_id)";
            $stmtPlat = $this->db->prepare($sqlPlat);

            foreach ($arrayPlats as $platId) {
                $stmtPlat->execute([
                    ':menu_id' => $menuId,
                    ':plat_id' => $platId
                ]);
            }
        }

        $this->db->commit();
        return $menuId;
    }

    #[Override]
    public function delete(int $id): void
    {
        $stmt = $this->db->prepare("DELETE FROM menu WHERE menu_id = :id");
        $stmt->execute(['id' => $id]);
    }

    private function hydrateMenus(\PDOStatement $stmt): array
    {
        $menusData = [];


        // 1. Regroupement et aplatissement des doublons SQL
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $menuId = (int)$row['menu_id'];
            $platId = $row['plat_id'] ? (int)$row['plat_id'] : null;
            $alergeneId = $row['alergene_id'] ? (int)$row['alergene_id'] : null;

            if (!isset($menusData[$menuId])) {
                $menusData[$menuId] = [
                    "menu_id" => $menuId,
                    "menu_nom" => $row['menu_menu_nom'],
                    "nb_perso_min" => (int)$row['nb_perso_min'],
                    "menu_prix" => (float)$row["menu_prix"],
                    "description" => $row['description'],
                    "quantite_restante" => (int)$row['quantite_restante'],
                    "regime_nom" => $row['regime_nom'],
                    "theme_nom" => $row['theme_nom'],
                    "note_particuliere" => $row["note_particuliere"] ?? "",
                    "plats_details" => []
                ];
            }

            if ($platId !== null) {
                if (!isset($menusData[$menuId]['plats_details'][$platId])) {
                    $menusData[$menuId]['plats_details'][$platId] = [
                        "plat_id" => $platId,
                        "nom" => $row['plat_nom'],
                        "type_plat" => $row['type_plat'],
                        "photo" => $row['photo'] ? 'data:image/jpeg;base64,' . base64_encode($row['photo']) : null,
                        "alergenes" => []
                    ];
                }

                if ($alergeneId !== null) {
                    $alergenesList = &$menusData[$menuId]['plats_details'][$platId]['alergenes'];
                    if (!in_array($row['alergene_nom'], $alergenesList)) {
                        $alergenesList[] = $row['alergene_nom'];
                    }
                }
            }
        }

        // 2. Conversion du tableau associatif en objets `Menus`
        $menusObjects = [];
        foreach ($menusData as $data) {
            // Nettoyage et réindexation des tableaux d'allergènes
            $platsDetailsClean = array_values(array_map(function ($plat) {
                $plat['alergenes'] = array_values($plat['alergenes']);
                return $plat;
            }, $data['plats_details']));


            $platIds = array_keys($data['plats_details']);

            $menu = new Menu(
                menu_nom: $data['menu_nom'],
                nb_perso_min: $data['nb_perso_min'],
                menu_prix: $data['menu_prix'],
                description: $data['description'],
                quantite_restante: $data['quantite_restante'],
                plat_id: $platIds,
                regime_nom: $data['regime_nom'],
                theme_nom: $data['theme_nom'],
                menu_id: $data['menu_id'],
                note_particuliere: $data['note_particuliere'],
                plats_details: $platsDetailsClean
            );

            $menusObjects[] = $menu;
        }

        return $menusObjects;
    }
}
