<?php


class MenuController
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllMenus(): void
    {
        try {
            $stmt = $this->pdo->query("SELECT 
                m.menu_id,
                m.titre AS menu_titre,
                m.nombre_personne_minimum,
                m.prix_par_personne,
                m.description,
                m.quantite_restante,
                r.nom_regime AS regime_nom,   
                t.theme_nom AS theme_nom,       
                GROUP_CONCAT(p.nom_plat) AS liste_plats
            FROM menu m
            JOIN regime r ON m.regime_id = r.regime_id
            JOIN theme t ON m.theme_id = t.theme_id
            LEFT JOIN menu_plat mp ON m.menu_id = mp.menu_id
            LEFT JOIN plat p ON mp.plat_id = p.plat_id
            GROUP BY m.menu_id;");

            $menus = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $menuTab = [
                    "menu_id" => (int)$row['menu_id'],
                    "menu_titre" => $row['menu_titre'],
                    "nombre_personne_minimum" => (int)$row['nombre_personne_minimum'],
                    "prix_par_personne" => doubleval($row["prix_par_personne"]),
                    "description" => $row['description'],
                    "quantite_restante" => (int)$row['quantite_restante'],
                    "regime_nom" => $row["regime_nom"],
                    "theme_nom" => $row["theme_nom"],
                    "liste_plats" => $row['liste_plats'] ? explode(',', $row['liste_plats']) : []
                ];

                $menus[] = $menuTab;
            };
            http_response_code(200);
            echo json_encode($menus);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getOneByID(): void
    {
        try {
            $stmt = $this->pdo->query("SELECT 
                m.menu_id,
                m.titre AS menu_titre,
                m.nombre_personne_minimum,
                m.prix_par_personne,
                m.description,
                m.quantite_restante,
                r.nom_regime AS regime_nom,   
                t.theme_nom AS theme_nom, 
 
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'plat_id', p.plat_id,
                        'nom', p.nom,
                        'alergenes', (
                            SELECT IFNULL(JSON_ARRAYAGG(a.nom), JSON_ARRAY())
                            FROM plat_alergene pa
                            JOIN alergene a ON pa.alergene_id = a.alergene_id
                            WHERE pa.plat_id = p.plat_id
                        )
                    )
                )
                FROM menu_plat mp
                JOIN plat p ON mp.plat_id = p.plat_id
                WHERE mp.menu_id = m.menu_id
            ) AS plats_details
        FROM menu m
        JOIN regime r ON m.regime_id = r.regime_id
        JOIN theme t ON m.theme_id = t.theme_id
        WHERE m.menu_id = :id;");

            $menu = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $menuTab = [
                    "menu_titre" => $row['menu_titre'],
                    "nombre_personne_minimum" => (int)$row['nombre_personne_minimum'],
                    "prix_par_personne" => doubleval($row["prix_par_personne"]),
                    "description" => $row['description'],
                    "quantite_restante" => (int)$row['quantite_restante'],
                    "regime_nom" => $row["regime_nom"],
                    "theme_nom" => $row["theme_nom"],
                    "liste_plats" => $row['liste_plats'] ? explode(',', $row['liste_plats']) : []
                ];

                $menu[] = $menuTab;
            };
            http_response_code(200);
            echo json_encode($menu);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
