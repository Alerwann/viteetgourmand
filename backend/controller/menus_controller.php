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
                m.note_particuliere,
                r.nom_regime AS nom_regime,   
                t.theme_nom AS theme_nom,       
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'plat_id', p.plat_id,
                            'nom', p.nom_plat,
                            'type_plat', p.type_plat,
                            'photo', CONCAT('data:image/jpeg;base64,', TO_BASE64(p.photo)),
                            'alergenes', (
                                SELECT IFNULL(JSON_ARRAYAGG(a.alergene_nom), JSON_ARRAY())
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
            JOIN theme t ON m.theme_id = t.theme_id;");

            $menus = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $menus[] = [
                    "menu_id" => (int)$row['menu_id'],
                    "menu_titre" => $row['menu_titre'],
                    "nombre_personne_minimum" => (int)$row['nombre_personne_minimum'],
                    "prix_par_personne" => (float)$row["prix_par_personne"],
                    "description" => $row['description'],
                    "quantite_restante" => (int)$row['quantite_restante'],
                    "nom_regime" => $row["nom_regime"],
                    "theme_nom" => $row["theme_nom"],
                    "note_particuliere" => $row["note_particuliere"],
                    "plats_details" => $row['plats_details'] ? json_decode($row['plats_details'], true) : []
                ];
            }

            http_response_code(200);
            echo json_encode($menus);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getOneByID(): void
    {
        $id = isset($_GET['id']) ? $_GET['id'] : 1;
        try {
            $stmt = $this->pdo->prepare("SELECT 
                m.menu_id,
                m.titre AS menu_titre,
                m.nombre_personne_minimum,
                m.prix_par_personne,
                m.description,
                m.quantite_restante,
                m.note_particuliere,
                r.nom_regime AS nom_regime,   
                t.theme_nom AS theme_nom, 
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'plat_id', p.plat_id,
                            'nom', p.nom_plat,
                            'type_plat', p.type_plat,
                            'photo', CONCAT('data:image/jpeg;base64,', TO_BASE64(p.photo)),
                            'alergenes', (
                                SELECT IFNULL(JSON_ARRAYAGG(a.alergene_nom), JSON_ARRAY())
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
            WHERE m.menu_id = :id");

            $stmt->execute(['id' => $id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(["message" => "Menu non trouvé"]);
                return;
            }

            $menu = [
                "menu_id" => (int)$row['menu_id'],
                "menu_titre" => $row['menu_titre'],
                "nombre_personne_minimum" => (int)$row['nombre_personne_minimum'],
                "prix_par_personne" => (float)$row["prix_par_personne"],
                "description" => $row['description'],
                "quantite_restante" => (int)$row['quantite_restante'],
                "nom_regime" => $row["nom_regime"],
                "theme_nom" => $row["theme_nom"],
                "note_particuliere" => $row["note_particuliere"],
                "plats_details" => $row['plats_details'] ? json_decode($row['plats_details'], true) : []
            ];

            http_response_code(200);
            echo json_encode($menu);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
