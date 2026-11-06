<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');

require __DIR__ . '/../../vendor/autoload.php';

use MongoDB\Client as MongoClient;

try {
    $mongoUri = getenv('MONGO_URI') ?: 'mongodb+srv://alerwann411_db_user:4bit8fGglQfuSjZr@cluster0.ht7ylsp.mongodb.net/';
    $mongoClient = new MongoClient($mongoUri);
    $collection = $mongoClient->selectDatabase('vite_gourmand')->selectCollection('commande');

    // Récupération des filtres optionnels passés dans l'URL (ex: ?menuId=2&startDate=2026-01-01&endDate=2026-12-31)
    $filterMenuId = isset($_GET['menuId']) && $_GET['menuId'] !== '' ? (int) $_GET['menuId'] : null;
    $startDate   = isset($_GET['startDate']) && $_GET['startDate'] !== '' ? $_GET['startDate'] . 'T00:00:00Z' : null;
    $endDate     = isset($_GET['endDate']) && $_GET['endDate'] !== '' ? $_GET['endDate'] . 'T23:59:59Z' : null;

    // Construction dynamique du filtre global ($match)
    $matchConditions = [];

    if ($filterMenuId !== null) {
        $matchConditions['menuId'] = $filterMenuId;
    }

    if ($startDate && $endDate) {
        $matchConditions['createdAt'] = [
            '$gte' => $startDate,
            '$lte' => $endDate
        ];
    } elseif ($startDate) {
        $matchConditions['createdAt'] = ['$gte' => $startDate];
    } elseif ($endDate) {
        $matchConditions['createdAt'] = ['$lte' => $endDate];
    }


    $pipelineVolume = [];
    if (!empty($matchConditions)) {
        $pipelineVolume[] = ['$match' => $matchConditions];
    }
    $pipelineVolume[] = [
        '$group' => [
            '_id' => '$menuName',
            'totalOrders' => ['$sum' => 1],
            'totalQuantity' => ['$sum' => '$quantity']
        ]
    ];
    $pipelineVolume[] = ['$sort' => ['totalOrders' => -1]];

    $volumeData = $collection->aggregate($pipelineVolume)->toArray();


    $pipelineTurnover = [];
    if (!empty($matchConditions)) {
        $pipelineTurnover[] = ['$match' => $matchConditions];
    }
    $pipelineTurnover[] = [
        '$project' => [
            'menuName' => 1,
            'subtotal' => ['$multiply' => ['$quantity', '$unitPrice']]
        ]
    ];
    $pipelineTurnover[] = [
        '$group' => [
            '_id' => '$menuName',
            'turnover' => ['$sum' => '$subtotal']
        ]
    ];
    $pipelineTurnover[] = ['$sort' => ['turnover' => -1]];

    $turnoverData = $collection->aggregate($pipelineTurnover)->toArray();

    echo json_encode([
        'success' => true,
        'volumeByMenu' => $volumeData,
        'turnoverByMenu' => $turnoverData
    ], JSON_PRETTY_PRINT);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
