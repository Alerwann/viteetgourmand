<?php

namespace App\Repository;

use App\Entity\Menus;

interface MenuRepositoryInterface
{
    public function findById(int $id): ?Menus;
    public function findAll(): array;
    public function save(Menus $menu): int;
    public function delete(int $id): void;
}
