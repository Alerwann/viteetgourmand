<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");



require_once __DIR__ . '/../classes/Horaire.php';

try {
    // 2. Récupération des variables d'environnement configurées dans Docker
    $host = 'mysql';
    $db_name = getenv('MYSQL_DATABASE');
    $username = getenv('MYSQL_USER');
    $password = getenv('MYSQL_PASSWORD');

    // 3. Connexion à la base de données via PDO
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    
    // Configuration de PDO pour lancer des erreurs en cas de problème SQL
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 4. Préparation et exécution de la requête SQL pour récupérer les horaires
    $query = "SELECT jour, heure_ouverture, heure_fermeture FROM horaire";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    // 5. Récupération des résultats et formatage en tableau propre
    $horaires = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $horaires[] = [
            'jour' => $row['jour'],
            // On convertit explicitement en entier (int) pour correspondre au format React (-1 ou chiffres)
            'heure_ouverture' => (int) $row['heure_ouverture'],
            'heure_fermeture' => (int) $row['heure_fermeture']
        ];
    }

    // 6. Envoi de la réponse finale au format JSON vers ton application React
    http_response_code(200);
    echo json_encode($horaires);

} catch (PDOException $e) {
    // 7. En cas d'erreur de connexion ou de requête, on renvoie un message JSON d'erreur propre
    http_response_code(500);
    echo json_encode([
        "message" => "Erreur base de données : " . $e->getMessage()
    ]);
}
?>