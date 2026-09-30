<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");



require_once __DIR__ . '/../classes/Horaire.php';
require_once __DIR__ . '/db_init.php';

    $query = "SELECT jour, heure_ouverture, heure_fermeture FROM horaire";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $horaires = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $horaires[] = [
            'jour' => $row['jour'],
            'heure_ouverture' => (int) $row['heure_ouverture'],
            'heure_fermeture' => (int) $row['heure_fermeture']
        ];
    }


    http_response_code(200);
    echo json_encode($horaires);

?>