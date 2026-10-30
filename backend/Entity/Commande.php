<?php

namespace App\Entity;

use App\Enum\StatusCommande;
use App\Entity\PrestationDetail;
use JsonSerializable;
use Override;

class Commande implements JsonSerializable
{
    private ?int $commande_id;
    private string $commande_ref;
    private ?string $commande_date;
    private int $nombre_personne;
    private int $menu_id;
    private int $utilisateur_id;
    private PrestationDetail $commande_presta;
    private StatusCommande $commande_status;


    public function __construct(string $commande_ref, int $nombre_personne, int $menu_id, int $utilisateur_id, PrestationDetail $commande_presta, StatusCommande $commande_status, ?int $commande_id = \null, ?string $commande_date = \null)
    {
        $this->commande_id = $commande_id;
        $this->commande_ref = $commande_ref;
        $this->commande_date = $commande_date;
        $this->nombre_personne = $nombre_personne;
        $this->menu_id = $menu_id;
        $this->utilisateur_id = $utilisateur_id;
        $this->commande_presta = $commande_presta;
        $this->commande_status = $commande_status;
    }

    public function getCommandeId(): ?int
    {
        return $this->commande_id;
    }
    public function getCommandeRef(): string
    {
        return $this->commande_ref;
    }
    public function getCommandeDate(): ?string
    {
        return $this->commande_date;
    }
    public function getNombrePersonne(): int
    {
        return $this->nombre_personne;
    }
    public function getMenuId(): int
    {
        return $this->menu_id;
    }
    public function getUtilisateurId(): int
    {
        return $this->utilisateur_id;
    }
    public function getPresta(): PrestationDetail
    {
        return $this->commande_presta;
    }
    public function getStatus(): StatusCommande
    {
        return $this->commande_status;
    }

    #[Override]
    public function jsonSerialize(): mixed
    {
        return [
            "commande_id" => $this->commande_id,
            "commande_ref" => $this->commande_ref,
            "commande_date" => $this->commande_date,
            "nombre_personne" => $this->nombre_personne,
            "menu_id" => $this->menu_id,
            "utilisateur_id" => $this->utilisateur_id,
            "commande_presta" => $this->commande_presta,
            "commande_status" => $this->commande_status
        ];
    }
}
