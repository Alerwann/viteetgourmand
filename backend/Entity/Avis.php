<?php

namespace App\Entity;

use App\Enum\StatusAvis;


class Avis
{
    private ?int $avis_id;
    private int $note;
    private string $description;
    private int $commande_id;
    private StatusAvis $status;
    private ?string $created_at = null;
    private ?string $commande_ref;


    public function __construct(string $description, int $commande_id, StatusAvis $status, int $note, ?int $avis_id = null, ?string $created_at, ?string $commande_ref)
    {
        $this->avis_id = $avis_id;
        $this->description = $description;
        $this->note = $note;
        $this->commande_id = $commande_id;
        $this->status = $status;
        $this->created_at = $created_at;
        $this->commande_ref = $commande_ref;
    }

    // GET/SET avisId
    public function getAvisId(): ?int
    {
        return $this->avis_id;
    }


    // GET/SET description
    public function getDescription(): string
    {
        return $this->description;
    }



    // GET/SET commandeId
    public function getCommandeId(): int
    {
        return $this->commande_id;
    }


    // GET/SET status

    public function getStatus(): StatusAvis
    {
        return $this->status;
    }



    // GET/SET note
    public function getNote(): int
    {
        return $this->note;
    }


    // GET/SET CreateAt
    public function getCreateAt(): string
    {
        return $this->created_at;
    }

    public function getCommandeRef(): string
    {
        return $this->commande_ref;
    }


    //création du tableau

    public function toArray(): array
    {
        return [
            "avis_id" => $this->avis_id,
            "description" => $this->description,
            "commande_id" => $this->commande_id,
            "status" => $this->status,
            "note" => $this->note,
            "created_at" => $this->created_at,
            "commande_ref" => $this->commande_ref,
        ];
    }
}
