<?php

namespace App\Services;

class MailerService
{
    private mixed $resend;

    public function __construct(mixed $resend)
    {
        $this->resend = $resend;
    }


    public function sendPasswordResetEmail(string $resetLink): void
    {
        try {
            $this->resend->emails->send([
                'from' => 'onboarding@resend.dev',
                'to' => 'alerwann411@gmail.com',
                'subject' => 'Réinitialisation de votre mot de passe',
                'html' => 'Bonjour,<br><br>Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le lien ci-dessous :<br><br><a href="' . $resetLink . '">' . $resetLink . '</a><br><br>Ce lien est valide pendant 15 minutes.'
            ]);
        } catch (Exception $e) {
            throw new \Exception("L'e-mail de confirmation n'a pas pu être envoyé : {$e->getMessage()}");
        }
    }

    public function sendWelcomeEmail(string $nom, string $prenom): void
    {
        try {
            $this->resend->emails->send([
                'from' => 'onboarding@resend.dev',
                'to' => 'alerwann411@gmail.com',
                'subject' => 'Bienvenue chez Vite & Gourmand',
                'html' => "Bonjour $prenom $nom,<br><br>Votre compte a été créé avec succès. Bienvenue parmi nous !<br><br>L'équipe."
            ]);
        } catch (Exception $e) {
            throw new \Exception("L'e-mail de bienvenue n'a pas pu être envoyé : {$e->getMessage()}");
        }
    }

    public function confirmationCommande(string $refCommande, string $nom, string $prenom): void
    {
        try {
            $this->resend->emails->send([
                'from' => 'onboarding@resend.dev',
                'to' => 'alerwann411@gmail.com',
                'subject' => 'Confirmation de votre commande',
                'html' => "Bonjour $nom $prenom,<br><br>Merci pour votre commande $refCommande.<br>Vous avez la possibilité de la modifier tant qu'elle est en statut acceptée.<br><br>L'équipe."
            ]);
        } catch (Exception $e) {
            throw new \Exception("L'e-mail de confirmation n'a pas pu être envoyé : {$e->getMessage()}");
        }
    }

    public function contactRequest(string $description, string $email, string $title): void
    {
        try {
            $this->resend->emails->send([
                'from' => 'onboarding@resend.dev',
                'to' => 'alerwann411@gmail.com',
                'subject' => "Demande client : $title",
                'html' => "Envoyé par : $email<br><br>Sa demande : $description"
            ]);
        } catch (Exception $e) {
            throw new \Exception("L'e-mail de confirmation n'a pas pu être envoyé : {$e->getMessage()}");
        }
    }
}
