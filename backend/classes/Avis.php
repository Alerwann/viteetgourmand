<?php

namespace App\Entity;

use App\Enum\StatusAvis;

require_once __DIR__ . '/Enum_Avis.php';

class Avis
{
    private ?int $avis_id;
    private int $note;
    private string $description;
    private int $commande_id;
    private StatusAvis $status;
    public ?string $created_at = null;


    public function __construct(string $description, int $commande_id, StatusAvis $status, int $note, ?int $avis_id = null, ?string $created_at = null)
    {
        $this->avis_id = $avis_id;
        $this->description = $description;
        $this->note = $note;
        $this->commande_id = $commande_id;
        $this->status = $status;
        $this->created_at = $created_at;
    }

    // GET/SET avisId
    public function getAvisId(): ?int
    {
        return $this->avis_id;
    }

    public function setAvisId(int $avis_id): void
    {
        $this->avis_id = $avis_id;
    }

    // GET/SET description
    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    // GET/SET commandeId
    public function getCommandeId(): int
    {
        return $this->commande_id;
    }

    public function setCommandeId(int $commande_id): void
    {
        $this->commande_id = $commande_id;
    }


    // GET/SET status

    public function getStatus(): StatusAvis
    {
        return $this->status;
    }

    public function setStatus(StatusAvis $status): void
    {
        $this->status = $status;
    }

    // GET/SET note
    public function getNote(): int
    {
        return $this->note;
    }

    public function setNote(int $note): void
    {
        $this->note = $note;
    }

    // GET/SET CreateAt
    public function getCreateAt(): string
    {
        return $this->created_at;
    }

    public function setCreateAt(string $date): void
    {
        $this->created_at = $date;
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
            "created_at" => $this->created_at
        ];
    }
}
