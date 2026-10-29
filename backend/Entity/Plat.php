<?php

namespace App\Entity;

use JsonSerializable;
use App\Enum\TypePlat;

require_once __DIR__ . '/Enum/Enum_type_plat.php';

class Plat implements JsonSerializable
{
    private ?int $plat_id;
    private string $plat_nom;
    private TypePlat $type_plat;
    private ?string $photo;
    private array $alergenes;

    public function __construct(?int $plat_id, string $plat_nom, TypePlat $type_plat, ?string $photo, array $alergenes)
    {
        $this->plat_id = $plat_id;
        $this->plat_nom = $plat_nom;
        $this->type_plat = $type_plat;
        $this->photo = $photo;
        $this->alergenes = $alergenes;
    }

    public function getId(): ?int
    {
        return $this->plat_id;
    }

    public function getNom(): string
    {
        return $this->plat_nom;
    }

    public function getTypePlat(): TypePlat
    {
        return $this->type_plat;
    }

    public function getPhoto(): string
    {
        return $this->photo;
    }

    public function getAlergenes(): array
    {
        return $this->alergenes;
    }

    public function toarray(): array
    {
        return ([
            "plat_id" => $this->plat_id,
            "plat_nom" => $this->plat_nom,
            "type_plat" => $this->type_plat,
            "photo" => $this->photo,
            "alergenes" => $this->alergenes
        ]);
    }
    public function jsonSerialize(): mixed
    {
        return [
            "plat_id" => $this->plat_id,
            "plat_nom" => $this->plat_nom,
            "type_plat" => $this->type_plat->value,
            "photo" => $this->photo,
            "alergenes" => $this->alergenes
        ];
    }
}
