<?php

namespace App\Repository\Horaire;

use App\Entity\Horaire;

interface HoraireRepositoryInterface
{
    public function getAll(): array;
    public function getOne(int $id): ?Horaire;
    public function updateHoraire(Horaire $horaire): void;
    public function delete(int $horaire_id): void;
}
