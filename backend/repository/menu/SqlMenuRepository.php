<?php

namespace App\Repository;

use App\Entity\Menus;
use Override;
use PDO;

require_once __DIR__ . '/MenuRepositoryInterface.php';
require_once __DIR__ . '/../../classes/Menus.php';

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
            m.titre AS menu_titre,
            m.nombre_personne_minimum,
            m.prix_par_personne,
            m.description,
            m.quantite_restante,
            m.note_particuliere,
            m.regime_id,
            m.theme_id,
            r.nom_regime,   
            t.theme_nom,
            p.plat_id,
            p.nom_plat,
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

    public function findById(int $menuId): ?Menus
    {
        $sql = "SELECT 
            m.menu_id,
            m.titre AS menu_titre,
            m.nombre_personne_minimum,
            m.prix_par_personne,
            m.description,
            m.quantite_restante,
            m.note_particuliere,
            m.regime_id,   -- Ajouté pour l'objet
            m.theme_id,    -- Ajouté pour l'objet
            r.nom_regime,   
            t.theme_nom,
            p.plat_id,
            p.nom_plat,
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


    public function save(Menus $menu): int
    {
        $this->db->beginTransaction();

        $sqlMenu = "INSERT INTO menu (titre, nombre_personne_minimum, prix_par_personne, description, quantite_restante, note_particuliere, regime_id, theme_id) 
                    VALUES (:titre, :nb_min, :prix, :desc, :qte, :note, :regime_id, :theme_id)";

        $stmtMenu = $this->db->prepare($sqlMenu);
        $stmtMenu->execute([
            ':titre'     => $menu->getTitle(),
            ':nb_min'    => $menu->getNbPersoMin(),
            ':prix'      => $menu->getPrix(),
            ':desc'      => $menu->getDescription(),
            ':qte'       => $menu->getQuantite(),
            ':note'      => $menu->getNoteParticuliere(),
            ':regime_id' => $menu->getRegimeId(),
            ':theme_id'  => $menu->getThemeId()
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
                    "title" => $row['menu_titre'],
                    "nombre_personne_minimum" => (int)$row['nombre_personne_minimum'],
                    "prix_par_personne" => (float)$row["prix_par_personne"],
                    "description" => $row['description'],
                    "quantite_restante" => (int)$row['quantite_restante'],
                    "regime_id" => (int)$row['regime_id'],
                    "theme_id" => (int)$row['theme_id'],
                    "note_particuliere" => $row["note_particuliere"] ?? "",
                    "plats_details" => []
                ];
            }

            if ($platId !== null) {
                if (!isset($menusData[$menuId]['plats_details'][$platId])) {
                    $menusData[$menuId]['plats_details'][$platId] = [
                        "plat_id" => $platId,
                        "nom" => $row['nom_plat'],
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

            $menu = new Menus(
                title: $data['title'],
                nb_perso_min: $data['nombre_personne_minimum'],
                prix_par_personne: $data['prix_par_personne'],
                description: $data['description'],
                quantite: $data['quantite_restante'],
                plat_id: $platIds,
                regime_id: $data['regime_id'],
                theme_id: $data['theme_id'],
                menu_id: $data['menu_id'],
                note_particuliere: $data['note_particuliere'],
                plats_details: $platsDetailsClean
            );

            $menusObjects[] = $menu;
        }

        return $menusObjects;
    }
}
