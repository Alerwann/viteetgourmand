<?php
class Theme_controller
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllTheme(): void
    {
        try {
            $stmt = $this->pdo->query("SELECT  theme_id, theme_nom FROM theme");

            $themes = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $themeObj = [
                    'theme_id' => (int)$row['theme_id'],
                    'theme_nom' => $row['theme_nom']
                ];

                $themes[] = $themeObj;
            }
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

        try {
            $stmt = $this->pdo->prepare("SELECT theme_id, theme_nom FROM theme WHERE theme_id = :theme_id ");
            $stmt->bindValue(':theme_id', $id, PDO::PARAM_INT);
            $stmt->execute();


            $row = $stmt->fetch(PDO::FETCH_ASSOC);

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
}
