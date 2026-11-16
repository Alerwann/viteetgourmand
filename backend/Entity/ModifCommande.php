<?php

namespace App\Entity;

use JsonSerializable;

class ModifCommande implements JsonSerializable
{
    private ?int $modif_id;

    private ?string $modif_contact;
    private ?string $modif_description;
    private int $commande_id;
    private ?int $utilisateur_id;
    private ?string $modif_date;

    public function __construct(int $commande_id, ?string $modif_contact, ?string $modif_description,  ?int $utilisateur_id, ?int $modif_id, ?string $modif_date)
    {
        $this->modif_id = $modif_id;
        $this->modif_contact = $modif_contact;
        $this->modif_description = $modif_description;
        $this->commande_id = $commande_id;
        $this->utilisateur_id = $utilisateur_id;
        $this->modif_date = $modif_date;
    }

    public function getModifId(): ?int
    {
        return $this->modif_id;
    }

    public function getModifContact(): ?string
    {
        return $this->modif_contact;
    }

    public function getModifDescription(): ?string
    {
        return $this->modif_description;
    }

    public function getCommandeId(): int
    {
        return $this->commande_id;
    }
    public function getUtilisateurId(): ?int
    {
        return $this->utilisateur_id;
    }
    public function getModifDate(): ?string
    {
        return $this->modif_date;
    }


    public function jsonSerialize(): array
    {
        return [
            "modif_id" => $this->modif_id,
            "modif_contact" => $this->modif_contact,
            "modif_description" => $this->modif_description,
            "commande_id" => $this->commande_id,
            "utilisateur_id" => $this->utilisateur_id,
            "modif_date" => $this->modif_date
        ];
    }
}
