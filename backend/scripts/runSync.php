<?php
// scripts/run_sync.php

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../config/db_init.php'; // Votre connexion PDO à MySQL

use MongoDB\Client as MongoClient;

try {
    // 1. Connexion MongoDB Atlas via l'environnement
    $mongoUri = getenv('MONGO_URI');
    if (empty($mongoUri)) {
        throw new \Exception("La variable d'environnement MONGO_URI n'est pas définie.");
    }

    $mongoClient = new MongoClient($mongoUri);
    $collection = $mongoClient->selectDatabase('vite_gourmand')->selectCollection('commande');

    // 2. Récupérer la date de la dernière commande déjà synchronisée
    $lastOrder = $collection->findOne([], ['sort' => ['createdAt' => -1]]);
    $lastSyncDate = $lastOrder ? $lastOrder['createdAt'] : '1970-01-01 00:00:00';

    // 3. Requête SQL adaptée à votre vraie structure (table commande + jointure menu)
    $stmt = $pdo->prepare("
        SELECT 
            c.commande_id, 
            c.commande_date, 
            c.nombre_personne, 
            m.menu_id, 
            m.menu_nom, 
            m.menu_prix
        FROM commande c
        JOIN menu m ON c.menu_id = m.menu_id
        WHERE c.commande_date >= :last_sync
    ");
    $stmt->execute(['last_sync' => $lastSyncDate]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $count = 0;

    // 4. Insertion / Upsert dans MongoDB
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
