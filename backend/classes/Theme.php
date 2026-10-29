<?php

namespace App\Entity;

use JsonSerializable;

class Theme implements JsonSerializable
{
    private ?int $theme_id;
    private string $theme_nom;

    public function __construct(?int $theme_id, string $theme_nom)
    {
        $this->theme_id = $theme_id;
        $this->theme_nom = $theme_nom;
    }

    public function getThemeId(): ?int
    {
        return $this->theme_id;
    }

    public function getThemeNom(): string
    {
        return $this->theme_nom;
    }

    public function jsonSerialize(): mixed
    {
        return [
            "theme_id" => $this->theme_id,
            "theme_nom" => $this->theme_nom
        ];
    }
}
