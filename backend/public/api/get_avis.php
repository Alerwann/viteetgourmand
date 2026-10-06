<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../classes/Avis.php';
require_once __DIR__ . '/db_init.php';

$query = "SELECT title,description, status,note FROM avis";
$stmt = $pdo->prepare($query);
$stmt->execute();

$avis = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   
    $avisObj = new Avis(
        title: $row['titre'],
        description: $row['description'],
        status: $row['statut'],
        note: $row['note'],
        avis_id: $row['avis_id']
    );


    $avis[] = $avisObj->toArray();
}

 http_response_code(200);
  echo json_encode($avis);

  ?>