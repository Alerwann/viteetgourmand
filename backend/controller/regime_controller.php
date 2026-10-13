<?php
class Regime_controller
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllRegime(): void
    {
        try {
            $stmt = $this->pdo->query("SELECT  regime_id, nom_regime FROM regime");

            $regime = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $regimeObj = [
                    'regime_id' => (int)$row['regime_id'],
                    'nom_regime' => $row['nom_regime']
                ];

                $regime[] = $regimeObj;
            }
            http_response_code(200);
            echo json_encode($regime);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
