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
}
