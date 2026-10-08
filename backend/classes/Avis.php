<?php
require_once __DIR__ . '/Enum_Avis.php';

class Avis
{
    private ?int $avis_id;
    private string $note;
    private string $description;
    private StatusAvis $status;
    public ?string $created_at = null;


    public function __construct(string $description, StatusAvis $status, string $note, ?int $avis_id = null, ?string $created_at = null)
    {
        $this->avis_id = $avis_id;
        $this->description = $description;
        $this->note = $note;
        $this->status = $status;
        $this->created_at = $created_at;
    }

    public function getAvisId(): ?int
    {
        return $this->avis_id;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getStatus(): string
    {
        return $this->status->value;
    }

    public function getNote(): string
    {
        return $this->note;
    }

    public function getCreateAt(): string
    {
        return $this->created_at;
    }


    public function toArray(): array
    {
        return [
            "avis_id" => $this->avis_id,
            "description" => $this->description,
            "status" => $this->status,
            "note" => $this->note,
            "created_at" => $this->created_at
        ];
    }
}
