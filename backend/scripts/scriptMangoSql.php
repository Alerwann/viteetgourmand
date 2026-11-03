<?php


require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../config/db_init.php';

use MongoDB\Client as MongoClient;

try {

    $mongoUri = getenv('MONGO_URI') ?: 'mongodb+srv://alerwann411_db_user:4bit8fGglQfuSjZr@cluster0.ht7ylsp.mongodb.net/';
    $mongoClient = new MongoClient($mongoUri);
    $collection = $mongoClient->selectDatabase('vite_gourmand')->selectCollection('commande');


    $lastOrder = $collection->findOne([], ['sort' => ['createdAt' => -1]]);
    $lastSyncDate = $lastOrder ? $lastOrder['createdAt'] : '1970-01-01 00:00:00';


    $stmt = $pdo->prepare("
        SELECT 
            c.commande_id, 
            c.commande_date, 
            m.menu_id , 
            m.menu_nom AS menu_nom, 
            nombre_personne, 
            m.menu_prix
        FROM commande c
        JOIN menu m ON c.menu_id=m.menu_id
        WHERE c.commande_date >= :last_sync
    ");
    $stmt->execute(['last_sync' => $lastSyncDate]);
    $rows = $stmt->fetchAll();

    $count = 0;


    foreach ($rows as $row) {
        $document = [
            'sql_order_id' => (int) $row['commande_id'],
            'createdAt'    => $row['commande_date'],
            'menuId'       => (int) $row['menu_id'],
            'menuName'     => $row['menu_nom'],
            'quantity'     => (int) $row['nombre_personne'],
            'unitPrice'    => (float) $row['menu_prix'],
        ];

        $collection->updateOne(
            ['sql_order_id' => $document['sql_order_id']],
            ['$set' => $document],
            ['upsert' => true]
        );
        $count++;
    }

    echo "Synchronisation réussie : $count commandes traitées.\n";
} catch (\Exception $e) {
    echo "Erreur lors de la synchronisation : " . $e->getMessage() . "\n";
    exit(1);
}
