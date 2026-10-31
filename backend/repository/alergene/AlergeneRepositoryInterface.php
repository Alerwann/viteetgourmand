<?php

namespace App\Repository\Alergene;

use App\Entity\Alergene;

interface AlergeneRepositoryInterface
{
    public function findAll(): array;
    public function findById(int $alergene_id): array;
    public function createOne(Alergene $alergene): void;
    public function deleteOne(int $alergene_id): void;
}
