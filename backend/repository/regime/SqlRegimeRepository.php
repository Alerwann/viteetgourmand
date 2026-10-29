<?php

namespace App\Repository;

use App\Entity\Regime;
use PDO;
use PDOStatement;
use App\Repository\RegimeRepositoryInterface;

require_once __DIR__ . '/../../classes/Regime.php';
require_once __DIR__ . '/../../repository/regime/RegimeRepositoryInterface.php';

class SqlRegimeRepository implements RegimeRepositoryInterface
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    #[Override]
    public function getAll(): array
    {
        $stmt = $this->pdo->query("SELECT  regime_id, nom_regime FROM regime");

        return $this->hydrateRegime($stmt);
    }

    #[Override]
    public function getOne(int $id): Regime
    {
        $stmt = $this->pdo->prepare("SELECT  regime_id, nom_regime FROM regime WHERE regime_id= :regime_id");
        $stmt->execute([$id]);
        $arrayRegime = $this->hydrateRegime($stmt);
        return isset($arrayRegime) ? $arrayRegime[0] : [];
    }

    #[Override]
    public function save(Regime $regimeIn): void
    {
        if ($regimeIn->getRegimeId() !== null) {
            $stmt = $this->pdo->prepare("UPDATE regime set ( nom_regime= :nom_regime) WHERE regime_id = :regime_id");
            $params = [':regime_id' => $regimeIn->getRegimeId(), ':nom_regime' => $regimeIn->getNomRegime()];
        } else {
            $stmt = $this->pdo->prepare("INSERT INTO regime (nom_regime) VALUES (:nom_regime)");
            $params = [':nom_regime' => $regimeIn->getNomRegime()];
        }
        $stmt->execute($params);
    }

    #[Override]
    public function delete(int $id): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM regime WHERE regime_id = :id");
        $stmt->execute([$id]);
    }

    private function hydrateRegime(PDOStatement $stmt): array
    {
        $regime = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

            $regimeObj = [
                'regime_id' => (int)$row['regime_id'],
                'nom_regime' => $row['nom_regime']
            ];

            $regime[] = $regimeObj;
        }
        return $regime;
    }
}
