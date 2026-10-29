<?php

namespace App\Repository\Regime;

use App\Entity\Regime;

interface RegimeRepositoryInterface
{
    public function getAll(): array;
    public function getOne(int $id): Regime;
    public function save(Regime $regimeIn): void;
    public function delete(int $id): void;
}
