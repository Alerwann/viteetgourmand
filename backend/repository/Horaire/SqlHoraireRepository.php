<?php

namespace App\Repository\Horaire;

use App\Entity\Horaire;
use App\Repository\Horaire\HoraireRepositoryInterface;
use Override;
use PDO;
use PDOStatement;



class SqlHoraireRepository implements HoraireRepositoryInterface
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }


    #[Override]
    public function getAll(): array
    {
        $stmt = $this->pdo->query("SELECT horaire_id, jour, heure_ouverture, heure_fermeture FROM horaire");
        return $this->hydrateHoraire($stmt);
    }

    #[Override]
    public function getOne(int $id): ?Horaire
    {
        $stmt = $this->pdo->prepare("SELECT horaire_id, jour, heure_ouverture, heure_fermeture FROM horaire WHERE horaire_id=:horaire_id");
        $stmt->execute(['id' => $id]);
        $horaire = $this->hydrateHoraire($stmt);
        return $horaire ? $horaire : \null;
    }

    #[Override]
    public function updateHoraire(Horaire $horaire): void
    {
        $query = "UPDATE horaire SET horaire_id= ':horaire_id'  heure_ouverture = :ouverture, heure_fermeture = :fermeture WHERE jour = :jour";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute([
            'horaire_id' => $horaire->getId(),
            ':jour'      => $horaire->getJour(),
            ':ouverture' => $horaire->getHeureOuverture(),
            ':fermeture' => $horaire->getHeureFermeture()
        ]);
    }

    #[Override]
    public function delete(int $horaire_id): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM horaire WHERE $horaire_id = :id");
        $stmt->execute([$horaire_id]);
    }

    private function hydrateHoraire(PDOStatement $stmt): array
    {
        $horaires = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

            $horaireObj = new Horaire(
                horaire_id: (int) $row['horaire_id'],
                jour: $row['jour'],
                heure_ouverture: (int) $row['heure_ouverture'],
                heure_fermeture: (int) $row['heure_fermeture'],

            );
            $horaires[] = $horaireObj->toArray();
        }
        return $horaires;
    }
}
