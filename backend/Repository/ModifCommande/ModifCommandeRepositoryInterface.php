<?php

namespace App\Repository\ModifCommande;

use App\Entity\ModifCommande;

interface ModifCommandeRepositoryInterface
{
    public function getAll(): array;
    public function getByCommandeId(int $commandeId): array;
    public function save(ModifCommande $modifCommande): void;
    public function delete(int $modifId): void;
}
