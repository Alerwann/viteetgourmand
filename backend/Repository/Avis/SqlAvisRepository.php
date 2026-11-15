<?php

namespace App\Repository\Avis;

use App\Enum\StatusAvis;
use App\Entity\Avis;
use Override;
use PDO;



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
        $stmt = $this->pdo->query("SELECT a.avis_id, 
            a.description, 
            a.status,note , 
            a.commande_id, 
            a.created_at,
            c.commande_ref 
        FROM avis a 
        JOIN commande c ON a.commande_id = c.commande_id ");
        $listAvis = $this->hydrateAvis($stmt);
        return $listAvis;
    }

    #[Override]
    public function findByStatus(StatusAvis $status): ?array
    {
        $listAvis = [];
        $stmt = $this->pdo->prepare("SELECT a.avis_id, 
            a.description, 
            a.status,note , 
            a.commande_id, 
            a.created_at,
            c.commande_ref 
        FROM avis a 
        JOIN commande c ON a.commande_id = c.commande_id 
        WHERE status= :status");
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
    public function updateStatus(int $avisId, string $status): void
    {
        $stmt = $this->pdo->prepare("UPDATE avis SET status= :status WHERE avis_id =:avis_id");
        $stmt->execute([':avis_id' => $avisId, ':status' => $status]);
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
                commande_id: isset($row['commande_id']) ? (int)$row['commande_id'] : 0,
                commande_ref: $row['commande_ref'],
                created_at: $row['created_at']
            );

            $listAvis[] = $avisObj->toArray();
        }

        return $listAvis;
    }
}
