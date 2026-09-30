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


$host = 'mysql';
$db_name = getenv('MYSQL_DATABASE') ?: 'vite_gourmand';
$username = getenv('MYSQL_USER');
$password = getenv('MYSQL_PASSWORD');



$data = json_decode(file_get_contents("php://input"));

if (!empty($data->jour) && isset($data->heure_ouverture) && isset($data->heure_fermeture)) {
    try {
       
        $db = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   
        $queryCheck = "SELECT horaire_id FROM horaire WHERE jour = :jour";
        $stmtCheck = $db->prepare($queryCheck);
        $stmtCheck->execute([':jour' => $data->jour]);
        $existing = $stmtCheck->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            $query = "UPDATE horaire SET heure_ouverture = :ouverture, heure_fermeture = :fermeture WHERE jour = :jour";
            $stmt = $db->prepare($query);
            $stmt->execute([
                ':ouverture' => $data->heure_ouverture,
                ':fermeture' => $data->heure_fermeture,
                ':jour' => $data->jour
            ]);
            http_response_code(200);
            echo json_encode(["message" => "Horaire mis à jour avec succès !"]);
        } else {
            $query = "INSERT INTO horaire (jour, heure_ouverture, heure_fermeture) VALUES (:jour, :ouverture, :fermeture)";
            $stmt = $db->prepare($query);
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