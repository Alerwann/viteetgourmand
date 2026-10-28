<?php

namespace App\Entity;

class Alergene
{
    private ?int $alergene_id;
    private string $alergene_name;

    public function __construct(?int $alergene_id, string $alergene_name)
    {
        $this->alergene_id = $alergene_id;
        $this->alergene_name = $alergene_name;
    }

    // GET/SET alergene_id
    public function getAlergeneId(): ?int
    {
        return $this->alergene_id;
    }

    public function setAlergeneId(int $alergene_id): void
    {
        $this->alergene_id = $alergene_id;
    }
    // GET/SET alergene_name

    public function getAlergeneName(): string
    {
        return $this->alergene_name;
    }

    public function setAlergeneName(string $alergeneName): void
    {
        $this->alergene_name = $alergeneName;
    }

    // Creation du tableau
    public function toArray(): array
    {
        return ([
            "alergene_id" => $this->alergene_id,
            "alergene_name" => $this->alergene_name
        ]);
    }
}
