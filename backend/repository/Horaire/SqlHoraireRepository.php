<?php

namespace App\Repository;

use App\Entity\Horaire;
use Override;
use PDO;
use PDOStatement;

require_once __DIR__ . '/HoraireRepositoryInterface.php';
require_once __DIR__ . '/../../classes/Horaire.php';

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
    public function getOne(int $id): Horaire
    {
        throw new \Exception('Not implemented');
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
