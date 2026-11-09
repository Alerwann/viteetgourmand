<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../../config/db_init.php';

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


$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

$endpoint = end($segments);
$endpoint = str_replace('.php', '', $endpoint);


$allowedApiFiles = [
    'alergene',
    'auth',
    'avis',
    'commande',
    'contact_request',
    'horaires',
    'menus',
    'plat',
    'regime',
    'stats',
    'sync',
    'theme',
    'utilisateur'
];


if ($endpoint && in_array($endpoint, $allowedApiFiles)) {
    $fileToInclude = __DIR__ . '/api/' . $endpoint . '.php';

    if (file_exists($fileToInclude)) {
        require_once $fileToInclude;
        exit;
    }
}

http_response_code(404);
echo json_encode([
    "status" => "error",
    "message" => "Endpoint API introuvable."
]);
