<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Entity\PrestationDetail;
use App\Entity\AdressePostale;
use App\Entity\Utilisateur;
use App\Enum\StatusCommande;
use App\Repository\Commande\CommandeRepositoryInterface;
use App\Services\MailerService;


class CommandeController
{
    private CommandeRepositoryInterface $commandeRepo;
    private MailerService $mailer;
    private Utilisateur $user;


    public function __construct(CommandeRepositoryInterface $commandeRepo, MailerService $mailer, Utilisateur $user)
    {
        $this->commandeRepo = $commandeRepo;
        $this->mailer = $mailer;
        $this->user = $user;
    }

    private function createArray(Commande $commande): array
    {
        $presta = $commande->getPresta();
        $adresse = $presta ? $presta->getPrestationAdresse() : null;

        return [
            'commande_id' => $commande->getCommandeId(),
            'commande_ref' => $commande->getCommandeRef(),
            'nombre_personne' => $commande->getNombrePersonne(),
            'menu_id' => $commande->getMenuId(),
            'utilisateur_id' => $commande->getUtilisateurId(),
            'commande_status' => $commande->getStatus(),
            'commande_date' => $commande->getCommandeDate(),
            'commande_presta' => $presta ? [
                'prestation_date' => $presta->getPrestationDate(),
                'prestation_heure' => $presta->getPrestationHeure(),
                'livraison_prix' => $presta->getLivraisonPrix(),
                'pret_materiel' => $presta->getPretMateriel(),
                'restitution_materiel' => $presta->getRestitutionMateriel(),
                'adresse' => $adresse ? [
                    'numero_rue' => $adresse->getNumRue(),
                    'street' => $adresse->getStreet(),
                    'code_postal' => $adresse->getCodePostal(),
                    'ville' => $adresse->getVille(),
                    'pays' => $adresse->getPays(),
                ] : null
            ] : null
        ];
    }

    public function getAll(): void
    {
        try {
            $commandes = $this->commandeRepo->getAll();

            $data = \array_map(function ($commande) {
                return $this->createArray($commande);
            }, $commandes);

            http_response_code(200);
            echo json_encode($data);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getOne(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $id = $_GET['id'];
        }

        try {
            $commande = $this->commandeRepo->getOne($id);
            if ($commande == \null) {
                http_response_code(400);
                echo json_encode(["message" => "Commande inconnue."]);
                return;
            }
            $data = $this->createArray($commande);

            http_response_code(200);
            echo json_encode($data);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getOneByUtilisateurId(): void
    {
        if (!isset($_GET['utilisateur'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $utilisateur_id = $_GET['utilisateur'];
        }

        try {
            $commande = $this->commandeRepo->getByUtilisateurId($utilisateur_id);
            if ($commande == \null) {
                http_response_code(400);
                echo json_encode(["message" => "Commande inconnue."]);
                return;
            }
            $data = $this->createArray($commande);

            http_response_code(200);
            echo json_encode($data);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function save(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if ($data === null) {
            http_response_code(400);
            echo json_encode(["message" => "Données JSON invalides ou vides."]);
            return;
        }

        // 1. Clés obligatoires à la racine
        $requiredRootKeys = [
            'commande_ref',
            'nombre_personne',
            'menu_id',
            'utilisateur_id',
            'commande_status',
            'commande_presta'
        ];

        foreach ($requiredRootKeys as $key) {
            if (!isset($data[$key])) {
                http_response_code(400);
                echo json_encode(["message" => "Champ racine obligatoire manquant : $key"]);
                return;
            }
        }

        // 2. Clés obligatoires dans commande_presta
        $presta = $data['commande_presta'];
        $requiredPrestaKeys = [
            'prestation_date',
            'prestation_heure',
            'livraison_prix',
            'pret_materiel',
            'restitution_materiel',
            'prestation_adresse'
        ];

        foreach ($requiredPrestaKeys as $key) {
            if (!isset($presta[$key])) {
                http_response_code(400);
                echo json_encode(["message" => "Champ de prestation obligatoire manquant : $key"]);
                return;
            }
        }


        $adresse = $presta['prestation_adresse'];
        $requiredAdresseKeys = [
            'numero_rue',
            'street',
            'code_postal',
            'ville',
            'pays'
        ];

        foreach ($requiredAdresseKeys as $key) {
            if (!isset($adresse[$key])) {
                http_response_code(400);
                echo json_encode(["message" => "Champ d'adresse obligatoire manquant : $key"]);
                return;
            }
        }

        try {
            $prestation_adresse = new AdressePostale(
                street: $adresse['street'],
                ville: $adresse['ville'],
                pays: $adresse['pays'],
                numero_rue: $adresse['numero_rue'],
                code_postal: $adresse['code_postal']
            );

            $presta_Detail = new PrestationDetail(
                prestation_date: $presta['prestation_date'] ?? "essai",
                prestation_heure: $presta['prestation_heure'],
                prestation_adresse: $prestation_adresse,
                livraison_prix: (int) $presta['livraison_prix'],
                pret_materiel: $presta['pret_materiel'],
                restitution_materiel: $presta['restitution_materiel']
            );

            $commande = new Commande(
                commande_ref: $data['commande_ref'],
                nombre_personne: $data['nombre_personne'],
                menu_id: $data['menu_id'],
                utilisateur_id: $data['utilisateur_id'],
                commande_presta: $presta_Detail,
                commande_status: StatusCommande::from($data['commande_status']),
                commande_id: $data['commande_id'] ?? null,
                commande_date: $data['commande_date'] ?? null
            );

            $this->commandeRepo->save($commande);

            try {

                $email = $this->user->getEmail();
                $nom = $this->user->getNom();
                $prenom = $this->user->getPrenom();
                $refCommande = $commande->getCommandeRef();

                $this->mailer->confirmationCommande(toEmail: $email, refCommande: $refCommande, prenom: $prenom, nom: $nom,);
            } catch (\Exception $mailException) {
                error_log("Erreur envoi mail de bienvenue : " . $mailException->getMessage());
            }

            http_response_code(201);
            echo json_encode(["message" => "Commande enregistrée avec succès."]);
        } catch (\Throwable $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $e->getMessage()]);
        }
    }

    public function delete(): void
    {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
            return;
        } else {
            $commandeId = $_GET['id'];
        }
        try {
            $this->commandeRepo->delete($commandeId);
            http_response_code(200);
            echo json_encode(["message" => "Commande supprimé"]);
        } catch (\Throwable $th) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur serveur : " . $th->getMessage()]);
        }
    }
}
