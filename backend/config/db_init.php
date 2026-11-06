<?php
try {
    $host = getenv('DB_HOST');
    $port = getenv('DB8PORT');
    $db_name = getenv('DB_NAME');
    $username = getenv('DB_USER');
    $password = getenv('DB_PASSWORD');
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_SSL_CA => '/etc/ssl/certs.pem',
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false, // 1014
    ];
    $dsn = "mysql:host=$host;port=$port;dbname=$db_name;charset=utf8mb4";

    $pdo = new PDO($dsn, $username, $password, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Erreur de connexion : " . $e->getMessage()]);
    exit;
}
