<?php
// En-têtes CORS et format JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/db_init.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->jour) && isset($data->heure_ouverture) && isset($data->heure_fermeture)) {
    try {
       
  
    $queryCheck = "SELECT horaire_id FROM horaire WHERE jour = :jour";
        $stmtCheck = $pdo->prepare($queryCheck);
        $stmtCheck->execute([':jour' => $data->jour]);
        $existing = $stmtCheck->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            $query = "UPDATE horaire SET heure_ouverture = :ouverture, heure_fermeture = :fermeture WHERE jour = :jour";
            $stmt = $pdo->prepare($query);
            $stmt->execute([
                ':ouverture' => $data->heure_ouverture,
                ':fermeture' => $data->heure_fermeture,
                ':jour' => $data->jour
            ]);
            http_response_code(200);
            echo json_encode(["message" => "Horaire mis à jour avec succès !"]);
        } else {
            $query = "INSERT INTO horaire (jour, heure_ouverture, heure_fermeture) VALUES (:jour, :ouverture, :fermeture)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([
                ':jour' => $data->jour,
                ':ouverture' => $data->heure_ouverture,
                ':fermeture' => $data->heure_fermeture
            ]);
            http_response_code(201);
            echo json_encode(["message" => "Horaire créé avec succès !"]);
        }

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Erreur base de données : " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Données incomplètes."]);
}