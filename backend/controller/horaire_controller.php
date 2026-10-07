<?php

require_once __DIR__ . '/../classes/Horaire.php';

class HoraireController
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll(): void
    {

        try {
            $stmt = $this->pdo->query("SELECT horaire_id, jour, heure_ouverture, heure_fermeture FROM horaire");

            $horaires = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $horaireObj = new Horaire(
                    horaire_id: (int) $row['horaire_id'],
                    jour: $row['jour'],
                    heure_ouverture: (int) $row['heure_ouverture'],
                    heure_fermeture: (int) $row['heure_fermeture'],

                );
                $horaires[] = $horaireObj->toArray();
            }

            http_response_code(200);
            echo json_encode($horaires);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }



    public function updateHoraires(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);


        if (empty($data) || !isset($data['jour'], $data['heure_ouverture'], $data['heure_fermeture'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes (jour, heure d'ouverture, heure de fermeture)."]);
            return;
        }

        try {
            $query = "UPDATE horaire SET  heure_ouverture = :ouverture, heure_fermeture = :fermeture WHERE jour = :jour";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute([
                ':jour'      => $data['jour'],
                ':ouverture' => $data['heure_ouverture'],
                ':fermeture' => $data['heure_fermeture']
            ]);

            http_response_code(204);
            echo json_encode([
                "message" => "Horaire mis à jour avec succès !",
                "jour" => $data['jour']
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
