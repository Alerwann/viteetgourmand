<?php
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';


if ($origin === 'https://viteetgourmand.vercel.app' || preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST,DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

header("Content-Type: application/json; charset=UTF-8");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

try {

    require __DIR__ . '/../../scripts/run_sync_internal.php';

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
