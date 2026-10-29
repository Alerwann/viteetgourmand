<?php

namespace App\Entity;

use JsonSerializable;

class Regime implements JsonSerializable
{
    private ?int $regime_id;
    private string $nom_regime;

    public function __construct(?int $regime_id, string $nom_regime)
    {
        $this->regime_id = $regime_id;
        $this->nom_regime = $nom_regime;
    }

    public function getRegimeId(): ?int
    {
        return $this->regime_id;
    }
    public function getNomRegime(): string
    {
        return $this->nom_regime;
    }
    public function jsonSerialize(): mixed
    {
        return [
            "regime_id" => $this->regime_id,
            "nom_regime" => $this->nom_regime
        ];
    }
}
