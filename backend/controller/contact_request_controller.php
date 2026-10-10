<?php

class ContactRequestcontroller
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function postRequest(): void
    {
        error_log("✅ au moins tu es dans post");
        $data = json_decode(file_get_contents("php://input"), true);

        $title = trim($data['title'] ?? '');
        $description = trim($data['description'] ?? '');
        $email = trim($data['email'] ?? '');

        if (empty($title) || empty($description) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["error" => "Données invalides."]);
            exit;
        }

        try {
            // Utilisation de la connexion injectée via le constructeur
            $stmt = $this->pdo->prepare("INSERT INTO contact_request (title, description, email) VALUES (?, ?, ?)");
            $stmt->execute([$title, $description, $email]);

            $to = "alerwann411@gmail.com";
            $subject = "Nouveau contact : " . htmlspecialchars($title);
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
