<?php

namespace App\Repository;

use App\Enum\StatusAvis;
use App\Entity\Avis;
use Override;
use PDO;


require_once __DIR__ . '/AvisRepositoryInterface.php';

class SqlAvisRepository implements AvisRepositoryInterface
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    #[Override]
    public function findAll(): array
    {
        $stmt = $this->pdo->query("SELECT avis_id, description, status,note , commande_id FROM avis");
        $listAvis = $this->hydrateAvis($stmt);
        return $listAvis;
    }

    #[Override]
    public function findByStatus(StatusAvis $status): ?array
    {
        $listAvis = [];
        $stmt = $this->pdo->prepare("SELECT avis_id,description, status,note, commande_id  FROM avis WHERE status= :status");
        $stmt->bindValue(':status', $status->value, PDO::PARAM_STR);
        $stmt->execute();

        $listAvis = $this->hydrateAvis($stmt);
        return $listAvis;
    }

    #[Override]
    public function findLastAvis(int $quantity): ?array
    {
        $listAvis = [];
        $stmt = $this->pdo->prepare("SELECT avis_id,description, status,note, commande_id FROM avis ORDER BY created_at DESC LIMIT :limite ");
        $stmt->bindValue(':limite', $quantity, PDO::PARAM_INT);
        $stmt->execute();

        $listAvis = $this->hydrateAvis($stmt);

        return $listAvis;
    }

    #[Override]
    public function save(Avis $data): int
    {
        $stmt = $this->pdo->prepare("INSERT INTO avis (description,status,note,commande_id) VALUES (:description,:status,:note, :commande_id)");
        $stmt->execute([':description' => $data->getDescription(), ':status' => $data->getStatus(), ':note' => $data->getNote(), ':commande_id' => $data->getCommandeId()]);
        return (int) $this->pdo->lastInsertId();
    }

    #[Override]
    public function delete(int $id): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM avis WHERE avis_id = :id");
        $stmt->execute(['id' => $id]);
    }



    private function hydrateAvis(\PDOStatement $stmt): ?array
    {
        $listAvis = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $avisObj = new Avis(
                avis_id: isset($row['avis_id']) ? (int) $row['avis_id'] : 0,
                description: $row['description'],
                status: StatusAvis::from($row['status']),
                note: (int)$row['note'],
                commande_id: isset($row['commande_id']) ? (int)$row['commande_id'] : 0
            );

            $listAvis[] = $avisObj->toArray();
        }

        return $listAvis;
    }
}
