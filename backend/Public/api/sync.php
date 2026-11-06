<?php
// public/api/sync.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');

try {
    // Ici, vous pouvez inclure ou exécuter la logique de votre script de synchronisation
    // Par exemple, en appelant un service ou en intégrant le code directement :
    require __DIR__ . '/../../scripts/run_sync_internal.php'; // Version de votre script qui retourne un statut au lieu d'un echo texte

    echo json_encode([
        'success' => true,
        'message' => 'Synchronisation effectuée avec succès.'
    ]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
