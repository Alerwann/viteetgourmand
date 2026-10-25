<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;



class MailerService
{
    public function sendPasswordResetEmail(string $toEmail, string $resetLink): void
    {
        $mail = new PHPMailer(true);

        try {
            // Configuration du serveur SMTP (pointant vers Mailpit via Docker)
            $mail->isSMTP();
            $mail->Host = $_ENV['MAIL_HOST'] ?? 'mailpit';
            $mail->Port = (int)($_ENV['MAIL_PORT'] ?? 1025);
            $mail->SMTPAuth = false;

            // Expéditeur et destinataire
            $mail->setFrom('no-reply@mon-app.local', 'Mon Application');
            $mail->addAddress($toEmail);

            // Contenu de l'e-mail
            $mail->isHTML(true);
            $mail->Subject = 'Réinitialisation de votre mot de passe';
            $mail->Body    = 'Bonjour,<br><br>Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien ci-dessous :<br><br><a href="' . $resetLink . '">' . $resetLink . '</a><br><br>Ce lien est valide pendant 15 minutes.';
            $mail->AltBody = 'Veuillez copier ce lien pour réinitialiser votre mot de passe : ' . $resetLink;

            $mail->send();
        } catch (Exception $e) {
            throw new \Exception("L'e-mail n'a pas pu être envoyé. Erreur Mailer : {$mail->ErrorInfo}");
        }
    }
}
