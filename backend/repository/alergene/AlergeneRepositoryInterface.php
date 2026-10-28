<?php

namespace App\Repository;

use App\Entity\Alergene;

interface AlergeneRepositoryInterface
{
    public function findAll(): array;
    public function findById(int $alergene_id): array;
    public function createOne(Alergene $alergene): id;
    public function deleteOne(int $alergene_id): void;
}
