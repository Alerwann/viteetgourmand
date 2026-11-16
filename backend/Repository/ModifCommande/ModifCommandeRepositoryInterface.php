<?php

namespace App\Repository\ModifCommande;

use App\Entity\ModifCommande;

interface ModifCommandeRepositoryInterface
{
    public function getAll(): array;
    public function getByUserId(int $utilisateurId): array;
    public function save(ModifCommande $modifCommande): void;
    public function delete(int $modifId): void;
}
