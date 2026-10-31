<?php

namespace App\Repository\Alergene;

use App\Entity\Alergene;
use PDO;
use Override;
use PDOStatement;



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
    public function createOne(Alergene $alergene): void
    {
        if ($alergene->getAlergeneId() !== null) {
            $stmt = $this->pdo->prepare("UPDATE alergene set ( alergene_nom= :alergene_nom) WHERE alergene_id = :alergene_id");
            $params = [':alergene_id' => $alergene->getAlergeneId(), ':alergene_nom' => $alergene->getAlergeneId()];
        } else {
            $stmt = $this->pdo->prepare("INSERT INTO regime (alergene_nom) VALUES (:alergene_nom)");
            $params = [':alergene_nom' => $alergene->getAlergeneId()];
        }
        $stmt->execute($params);
    }

    #[Override]
    public function deleteOne(int $alergene_id): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM alergene WHERE alergene_id = :id");
        $stmt->execute([$alergene_id]);
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
