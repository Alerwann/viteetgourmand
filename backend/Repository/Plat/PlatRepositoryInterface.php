<?php

namespace App\Repository\plat;

use App\Entity\Plat;
use App\Enum\TypePlat;



interface PlatRepositoryInterface
{
    public function getAll(): array;
    public function getOne(int $id): array;
    public function getByType(TypePlat $type): array;
    public function save(Plat $plat): int;
    public function delete(int $id): void;
}
