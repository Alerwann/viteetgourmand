<?php

class PlatAlergeneController
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllPlatAle()
    {
        try {
            $stmt = $this->pdo->query("SELECT plat_id,alergene_id FROM plat_alergene");

            $plat_alergenes = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $alergeneArray = [
                    "plat_id" => $row['plat_id'],
                    "alergene_id" => $row['alergene_id'],

                ];

                $alergenes[] = $alergeneArray;
            }
            http_response_code(200);
            echo json_encode($plat_alergenes);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getPAByPid()
    {
        $id_wanted = isset($_GET['id']) ? $_GET['id'] : "AUCUN";
        try {
            $stmt = $this->pdo->prepare("SELECT plat_id,alergene_id FROM plat_alergene WHERE plat_id= :id_wanted");
            $stmt->bindValue(':id_wanted', $id_wanted->value, PDO::PARAM_STR);
            $stmt->execute();

            $plats_al = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $platArray = [
                    "plat_id" => $row['plat_id'],
                    "alergene_id" => $row['alergene_id']
                ];

                $plats_al[] = $platArray;
            }
            http_response_code(200);
            echo json_encode($plats_al);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function CreatePlatAL()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data) || !isset($data['plat_id'], $data['alergene_ids']) || !is_array($data['alergene_ids'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes (plat_id, alergene_ids attendus)."]);
            return;
        }

        $platId = $data['plat_id'];
        $alergeneIds = $data['alergene_ids'];

        if (empty($alergeneIds)) {
            echo json_encode(['success' => true, 'message' => 'Aucun allergène à associer']);
            return;
        }

        try {
            $placeholders = [];
            $values = [];


            foreach ($alergeneIds as $alergeneId) {
                $placeholders[] = "(?, ?)";
                $values[] = $platId;
                $values[] = $alergeneId;
            }

            $sql = "INSERT INTO plat_alergene (plat_id, alergene_id) VALUES " . implode(', ', $placeholders);

            $stmt = $this->pdo->prepare($sql);


            $stmt->execute($values);

            echo json_encode([
                'success' => true,
                'message' => 'Allergènes associés avec succès'
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
