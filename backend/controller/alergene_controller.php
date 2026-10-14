<?php

class AlergeneController
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function  getAllalergene(): void
    {
        try {
            $stmt = $this->pdo->query("SELECT alergene_id,alergene_nom FROM alergene");

            $alergenes = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $alergeneArray = [
                    "alergene_id" => $row['alergene_id'],
                    "alergene_nom" => $row['alergene_nom']
                ];

                $alergenes[] = $alergeneArray;
            }
            http_response_code(200);
            echo json_encode($alergenes);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
