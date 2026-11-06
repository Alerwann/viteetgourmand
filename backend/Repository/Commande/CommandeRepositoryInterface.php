<?php

namespace App\Repository\Commande;

use App\Entity\Commande;

interface CommandeRepositoryInterface
{
    public function getAll(): array;
    public function getOne(int $commande_id): ?Commande;
    public function getByUtilisateurId(int $utilisateur_id): ?Commande;
    public function save(Commande $commande): void;
    public function delete(int $commande_id): void;
}
