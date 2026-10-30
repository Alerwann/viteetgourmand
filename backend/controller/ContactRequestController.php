<?php

namespace App\Controller;

use PDO;

class ContactRequestcontroller
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function postRequest(): void
    {

        $data = json_decode(file_get_contents("php://input"), true);

        $menu_nom = trim($data['menu_nom'] ?? '');
        $description = trim($data['description'] ?? '');
        $email = trim($data['email'] ?? '');

        if (empty($menu_nom) || empty($description) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["error" => "Données invalides."]);
            exit;
        }

        try {
            // Utilisation de la connexion injectée via le constructeur
            $stmt = $this->pdo->prepare("INSERT INTO contact_request (menu_nom, description, email) VALUES (?, ?, ?)");
            $stmt->execute([$menu_nom, $description, $email]);

            $to = "alerwann411@gmail.com";
            $subject = "Nouveau contact : " . htmlspecialchars($menu_nom);
            $body = "Message de : $email\n\nDescription :\n$description";
            $headers = "From: noreply@tudomaine.com\r\n" .
                "Reply-To: " . $email . "\r\n" .
                "X-Mailer: PHP/" . phpversion();

            mail($to, $subject, $body, $headers);

            http_response_code(201);
            echo json_encode(["success" => "Message envoyé avec succès."]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
