<?php

namespace App\Repository;

use App\Entity\Horaire;

interface HoraireRepositoryInterface
{
    public function getAll(): array;
    public function getOne(int $id): Horaire;
    public function updateHoraire(Horaire $horaire): void;
}
