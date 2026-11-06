<?php
try {

    $host = getenv('DB_HOST');
    $port = getenv('DB_PORT');
    $db_name = getenv('DB_NAME');
    $username = getenv('DB_USER');
    $password = getenv('DB_PASSWORD');


    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    if ($port == '4000') {
        $options[PDO::MYSQL_ATTR_SSL_CA] = true;
    }

    $dsn = "mysql:host=$host;port=$port;dbname=$db_name;charset=utf8mb4";

    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Erreur de connexion : " . $e->getMessage()]);
    exit;
}
