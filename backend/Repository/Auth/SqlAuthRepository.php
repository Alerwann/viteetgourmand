<?php

namespace App\Repository\Auth;

use App\Entity\ResetData;
use App\Repository\Auth\AuthRepositoryInterface;
use Override;
use PDO;
use PDOStatement;

class SqlAuthRepository implements AuthRepositoryInterface
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    #[Override]
    public function getOne(string $token): ?ResetData
    {
        $stmt = $this->pdo->prepare("SELECT token_id, token, tentatives,utilisateur_id  FROM password_reset_token WHERE token = :token");
        $stmt->execute([':token' => $token]);

        $tentative = $this->HydrateToken($stmt);

        return $tentative[0] ? $tentative[0] : [];
    }

    #[Override]
    public function delete_reset_token(int $utilisateur_id): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM  password_reset_token WHERE utilisateur_id = :utilisateur_id");
        $stmt->execute([':utilisateur_id' => $utilisateur_id]);
    }

    #[Override]
    public function update_reset_token(int $utilisateur_Id, string $token): void
    {
        $stmt = $this->pdo->prepare("UPDATE password_reset_token SET token = :token WHERE utilisateur_id = :utilisateur_id");
        $stmt->execute([
            ':token' => $token,
            ':utilisateur_id' => $utilisateur_Id
        ]);
    }

    #[Override]
    public function create(int $utilisateur_Id, string $token): void
    {
        $stmt = $this->pdo->prepare("INSERT INTO password_reset_token (token, tentatives, utilisateur_id) 
                                           VALUES (:token, 1, :utilisateur_id)");
        $stmt->execute([
            ':token' => $token,
            ':utilisateur_id' => $utilisateur_Id
        ]);
    }






    private function HydrateToken(PDOStatement $stmt): array
    {
        $resetDatas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $resetData = new ResetData(
                token: $row['token'],
                tentative: $row['tentatives'],
                utilisateur_id: $row['utilisateur_id'],
                token_id: $row['token_id'],

            );

            $resetDatas[] = $resetData;
        }
        return $resetDatas;
    }
}
