<?php

namespace App\Entity;

use JsonSerializable;

class Regime implements JsonSerializable
{
    private ?int $regime_id;
    private string $regime_nom;

    public function __construct(?int $regime_id, string $regime_nom)
    {
        $this->regime_id = $regime_id;
        $this->regime_nom = $regime_nom;
    }

    public function getRegimeId(): ?int
    {
        return $this->regime_id;
    }
    public function getNomRegime(): string
    {
        return $this->regime_nom;
    }
    public function jsonSerialize(): mixed
    {
        return [
            "regime_id" => $this->regime_id,
            "regime_nom" => $this->regime_nom
        ];
    }
}
