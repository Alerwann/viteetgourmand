<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MailerService
{
    private function createMailer(): PHPMailer
    {
        if (!class_exists('\PHPMailer\PHPMailer\PHPMailer')) {
            die("L'autoloader ne trouve pas PHPMailer !");
        }

        error_log("✅ createMailer exécuté");

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = $_ENV['MAIL_HOST'] ?? 'mailpit';
        $mail->Port = (int)($_ENV['MAIL_PORT'] ?? 1025);
        $mail->SMTPAuth = false;
        $mail->setFrom('no-reply@mon-app.local', 'Mon Application');
        $mail->isHTML(true);

        return $mail;
    }

    public function sendPasswordResetEmail(string $toEmail, string $resetLink): void
    {
        try {
            $mail = $this->createMailer();
            $mail->addAddress($toEmail);

            $mail->Subject = 'Réinitialisation de votre mot de passe';
            $mail->Body    = 'Bonjour,<br><br>Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien ci-dessous :<br><br><a href="' . $resetLink . '">' . $resetLink . '</a><br><br>Ce lien est valide pendant 15 minutes.';
            $mail->AltBody = 'Veuillez copier ce lien pour réinitialiser votre mot de passe : ' . $resetLink;

            $mail->send();
        } catch (Exception $e) {
            throw new \Exception("L'e-mail n'a pas pu être envoyé. Erreur Mailer : {$e->getMessage()}");
        }
    }

    public function sendWelcomeEmail(string $toEmail, string $prenom): void
    {
        try {
            $mail = $this->createMailer();
            $mail->addAddress($toEmail);

            $mail->Subject = 'Bienvenue sur Mon Application !';
            $mail->Body    = "Bonjour $prenom,<br><br>Votre compte a été créé avec succès. Bienvenue parmi nous !<br><br>L'équipe.";
            $mail->AltBody = "Bonjour $prenom, Votre compte a été créé avec succès. Bienvenue parmi nous !";

            $mail->send();
        } catch (Exception $e) {
            throw new \Exception("L'e-mail de bienvenue n'a pas pu être envoyé : {$e->getMessage()}");
        }
    }

    public function confirmationCommande(string $toEmail, string $refCommande, string $nom, string $prenom): void
    {
        try {
            $mail = $this->createMailer();
            error_log("✅ confirmation commande avant envoi");

            $mail->addAddress($toEmail);
            $mail->Subject = 'Confirmation de votre commande';
            $mail->Body    = "Bonjour $nom $prenom,<br><br>Merci pour votre commande $refCommande.<br>Vous avez la possibilité de la modifier tant qu'elle est en statut acceptée.<br><br>L'équipe.";
            $mail->AltBody = "Bonjour $nom $prenom, Merci pour votre commande $refCommande. Vous avez la possibilité de la modifier tant qu'elle est en statut acceptée. L'équipe.";

            $mail->send();
        } catch (Exception $e) {
            throw new \Exception("L'e-mail de confirmation n'a pas pu être envoyé : {$e->getMessage()}");
        }
    }
}
