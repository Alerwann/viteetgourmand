<?php

namespace App\Repository\Auth;

use App\Entity\ResetData;

interface AuthRepositoryInterface
{
    public function getOne(string $token): ?ResetData;
    public function create(int $utilisateur_Id, string $token): void;
    public function delete_reset_token(int $utilisateur_id): void;
    public function update_reset_token(int $utilisateur_Id, string $token): void;
}
