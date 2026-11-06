<?php
try {
    $host = getenv('DB_HOST') ?: 'mysql';
    $port = getenv('DB_PORT') ?: '3306';
    $db_name = getenv('DB_NAME');
    $username = getenv('DB_USER');
    $password = getenv('DB_PASSWORD');

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    // Si on est sur le cloud (port 4000), on configure proprement le SSL pour TiDB Cloud
    if ($port == '4000') {
        // Option 1 : Utiliser le certificat par défaut du système
        $options[PDO::MYSQL_ATTR_SSL_CA] = true;

        // Option 2 (alternative si l'option 1 renvoie toujours une erreur SSL) :
        // Décommente la ligne ci-dessous pour autoriser la connexion sans valider strictement le certificat racine si le conteneur en manque
        $options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = false;
    }

    $dsn = "mysql:host=$host;port=$port;dbname=$db_name;charset=utf8mb4";

    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Erreur de connexion : " . $e->getMessage()]);
    exit;
}
