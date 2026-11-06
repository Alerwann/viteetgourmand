<?php

namespace App\Repository\Menu;

use App\Entity\Menu;

interface MenuRepositoryInterface
{
    public function findById(int $id): ?Menu;
    public function findAll(): array;
    public function save(Menu $menu): int;
    public function delete(int $id): void;
}
