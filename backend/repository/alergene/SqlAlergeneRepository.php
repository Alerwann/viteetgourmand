<?php

namespace App\Repository;

use App\Entity\Alergene;
use App\Repository\AlergeneRepositoryInterface;
use PDO;
use Override;
use PDOStatement;

require_once __DIR__ . '/AlergeneRepositoryInterface.php';

class SqlAlergeneRepository implements AlergeneRepositoryInterface
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    #[Override]
    public function findAll(): array
    {
        $stmt = $this->pdo->query("SELECT alergene_id,alergene_nom FROM alergene");
        return $this->hydrateAlergene($stmt);
    }

    #[Override]
    public function findById(int $alergene_id): array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM utilisateur WHERE utilisateur_id = :id");
        $stmt->execute(['id' => $alergene_id]);


        return $this->hydrateAlergene($stmt);
    }

    #[Override]
    public function createOne(Alergene $alergene): id
    {
        throw new \Exception('Not implemented');
    }

    #[Override]
    public function deleteOne(int $alergene_id): void
    {
        throw new \Exception('Not implemented');
    }

    private function hydrateAlergene(PDOStatement $stmt): array
    {
        $alergenes = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $alergeneArray = [
                "alergene_id" => $row['alergene_id'],
                "alergene_nom" => $row['alergene_nom']
            ];

            $alergenes[] = $alergeneArray;
        }
        return $alergenes;
    }
}
