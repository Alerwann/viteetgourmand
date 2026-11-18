<?php

namespace App\Entity;

use JsonSerializable;
use Override;

class CommandeWithModif implements JsonSerializable
{
    private Commande $commande;
    private array $modifs;

    public function __construct(Commande $commande, array $modifs,)
    {
        $this->commande = $commande;
        $this->modifs = $modifs;
    }

    public function getCommande(): Commande
    {
        return $this->commande;
    }

    public function getModifs(): array
    {
        return $this->modifs;
    }

    #[Override]
    public function jsonSerialize(): mixed
    {
        return [
            'commande' => $this->commande,
            'modifs' => $this->modifs,

        ];
    }
}
