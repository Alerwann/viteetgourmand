<?php

namespace App\Controller;

use App\Services\MailerService;
use PDO;

class ContactRequestcontroller
{
    private PDO $pdo;
    private MailerService $mailer;

    public function __construct(PDO $pdo, MailerService $mailer)
    {
        $this->pdo = $pdo;
        $this->mailer = $mailer;
    }

    public function postRequest(): void
    {

        $data = json_decode(file_get_contents("php://input"), true);


        $description = trim($data['description'] ?? '');
        $email = trim($data['email'] ?? '');
        $title = trim($data['title']);

        if (empty($description) || empty($title) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["error" => "Données invalides."]);
            exit;
        }

        try {
            // Utilisation de la connexion injectée via le constructeur
            $stmt = $this->pdo->prepare("INSERT INTO contact_request (title, description, email) VALUES (?, ?, ?)");
            $stmt->execute([$title, $description, $email]);

            $this->mailer->contactRequest($description, $email, $title);

            http_response_code(201);
            echo json_encode(["success" => "Message envoyé avec succès."]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
