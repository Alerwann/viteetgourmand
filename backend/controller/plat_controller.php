<?php

class PlatController
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllPlat()
    {
        try {
            $stmt = $this->pdo->query("SELECT plat_id, nom_plat, type_plat,photo FROM plat");

            $plats = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $platArray = [
                    "plat_id" => $row['plat_id'],
                    "nom_plat" => $row['nom_plat'],
                    "type_plat" => $row['type_plat'],
                    "photo" => $row['photo']
                ];

                $plats[] = $platArray;
            }
            http_response_code(200);
            echo json_encode($plats);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getPlatByType()
    {
        $type = isset($_GET['type']) ? $_GET['type'] : "AUCUN";
        try {
            $stmt = $this->pdo->prepare("SELECT plat_id,nom_plat,type_plat,photo FROM plat WHERE type_plat= :type_plat");
            $stmt->bindValue(':type_plat', $type->value, PDO::PARAM_STR);
            $stmt->execute();

            $plats = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $platArray = [
                    "plat_id" => $row['plat_id'],
                    "nom_plat" => $row['nom_plat'],
                    "type_plat" => $row['type_plat'],
                    "photo" => $row['photo']
                ];

                $plats[] = $platArray;
            }
            http_response_code(200);
            echo json_encode($plats);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function createPlat()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data) || isset($data['nom_plat'], $data['type_plat'], $data['photo'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes ( id, nom, type, photo)."]);
            return;
        }

        try {
            $stmt = $this->pdo->prepare("INSERT INTO plat (nom_plat,type_plat,photo) VALUES (:nom_plat,:type_plat,:photo)");
            $stmt->execute([':nom_plat' => $data['nom_plat'], ':type_plat' => $data['type_plat'], ':photo' => $data['photo']]);
            http_response_code(201);
            echo json_encode([
                "message" => "plat créé avec succès !",
                "id" => (int) $this->pdo->lastInsertId()
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function updatePlat()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data) || isset($data['nom_plat'], $data['type_plat'], $data['photo'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes ( nom, type, photo)."]);
            return;
        }

        try {
            $query = "UPDATE plat SET  type_plat = :type_plat, photo = :photo WHERE nom_plat = :nom_plat";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute([
                ':nom_plat'      => $data['nom_plat'],
                ':type_plat' => $data['type_plat'],
                ':photo' => $data['photo']
            ]);


            http_response_code(200);
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
