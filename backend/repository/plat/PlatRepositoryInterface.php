<?php

namespace App\Repository;

use App\Entity\Plat;
use App\Enum\TypePlat;

require_once __DIR__ . '/../../classes/Enum/Enum_type_plat.php';

interface PlatRepositoryInterface
{
    public function getAll(): array;
    public function getOne(int $id): array;
    public function getByType(TypePlat $type): array;
    public function save(Plat $plat): int;
    public function delete(int $id): void;
}
