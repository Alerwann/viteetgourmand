<?php

namespace App\Repository;

use App\Entity\Utilisateur;

interface UserRepositoryInterface
{
    public function findById(int $id): ?Utilisateur;
    public function findByEmail(string $email): ?Utilisateur;
    public function findAll(): array;
    public function save(Utilisateur $utilisateur): int;
    public function delete(int $id): void;
}
