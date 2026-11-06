<?php

namespace App\Repository\Avis;

use App\Entity\Avis;
use App\Enum\StatusAvis;

interface AvisRepositoryInterface
{
    public function findAll(): array;
    public function findLastAvis(int $quantity): ?array;
    public function findByStatus(StatusAvis $status): ?array;
    public function save(Avis $utilisateur): int;
    public function delete(int $id): void;
}
