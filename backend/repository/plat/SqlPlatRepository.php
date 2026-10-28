<?php

namespace App\Repository;

use App\Repository\PlatRepositoryInterface;
use App\Entity\Plat;
use App\Enum\TypePlat;
use Override;
use PDOStatement;
use PDO;

require_once __DIR__ . '/PlatRepositoryInterface.php';
require_once __DIR__ . '/../../classes/Plat.php';
require_once __DIR__ . '/../../classes/Enum/Enum_type_plat.php';


class SqlPlatRepository implements PlatRepositoryInterface
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    #[Override]
    public function getAll(): array
    {
        $sql = "SELECT p.plat_id, p.plat_nom, p.type_plat,p.photo,a.alergene_id,a.alergene_nom 
        FROM plat p
        LEFT JOIN plat_alergene pa ON p.plat_id = pa.plat_id
        LEFT JOIN alergene a ON pa.alergene_id = a.alergene_id ";

        $stmt = $this->pdo->query($sql);

        $plats = $this->hydrationPlat($stmt);

        return $plats;
    }

    #[Override]
    public function getByType(TypePlat $type): array
    {
        $sql = "SELECT p.plat_id, p.plat_nom, p.type_plat,p.photo,a.alergene_id,a.alergene_nom 
        FROM plat p
        LEFT JOIN plat_alergene pa ON p.plat_id = pa.plat_id
        LEFT JOIN alergene a ON pa.alergene_id = a.alergene_id 
        WHERE p.type_plat =?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$type->value]);

        $plats = $this->hydrationPlat($stmt);

        return $plats;
    }

    #[Override]
    public function getOne(int $id): array
    {
        $sql = "SELECT p.plat_id, p.plat_nom, p.type_plat,p.photo,a.alergene_id,a.alergene_nom 
        FROM plat p
        LEFT JOIN plat_alergene pa ON p.plat_id = pa.plat_id
        LEFT JOIN alergene a ON pa.alergene_id = a.alergene_id 
        WHERE p.plat_id =?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);

        $plats = $this->hydrationPlat($stmt);
        return !empty($plats) ? $plats[0] : null;
    }

    #[Override]
    public function save(Plat $plat): int
    {
        $this->pdo->beginTransaction();


        if ($plat->getId() != 0) {
            $sql = "UPDATE plat SET(plat_nom = :plat_nom, type_plat = :type_plat, photo = :photo) WHERE plat_id= :plat_id";
        }
        $sql = "INSERT INTO plat (plat_nom, type_plat, photo) VALUES ( :plat_nom, :type_plat, :photo)";
        $stmt = $this->pdo->prepare($sql);

        $params = [
            'plat_nom' => $plat->getNom(),
            'type_plat' => $plat->getTypePlat()->value,
            'photo' => $plat->getPhoto()
        ];

        if ($plat->getId() != \null) {
            $params['plat_id'] = $plat->getId();
        }

        $stmt->execute($params);

        $platId = $this->pdo->lastInsertId();

        $arrayAlergene = $plat->getAlergenes();

        if (!empty($arrayAlergene)) {
            $sqlJoint = "INSERT INTO plat_alergene (plat_id,alergene_id) VALUES (:plat_id,:alergene_id)";
            $stmtJoint = $this->pdo->prepare($sqlJoint);

            foreach ($arrayAlergene as $alergeneId) {
                $stmtJoint->execute([
                    ':plat_id' => $platId,
                    ':alergene_id' => $alergeneId
                ]);
            }
        }
        $this->pdo->commit();
        return $platId;
    }


    #[Override]
    public function delete(int $id): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM plat WHERE plat_id = :id");
        $stmt->execute(['id' => $id]);
    }

    private function hydrationPlat(PDOStatement $stmt): array
    {
        $platsData = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $platId = (int)$row['plat_id'];
            $alergeneId = $row['alergene_id'] ? (int)$row['alergene_id'] : null;

            if (!isset($platsData[$platId])) {
                $platsData[$platId] = [
                    "plat_id" => $platId,
                    "plat_nom" => $row['plat_nom'],
                    "type_plat" => $row['type_plat'],
                    "photo" => $row['photo'] ? 'data:image/jpeg;base64,' . base64_encode($row['photo']) : null,
                    "alergenes" => []
                ];
            }

            if ($alergeneId !== null) {
                $alergenesList = &$platsData[$platId]['alergenes'];
                if (!in_array($row['alergene_nom'], $alergenesList)) {
                    $alergenesList[] = $row['alergene_nom'];
                }
            }
        }

        $platsObjects = [];
        foreach ($platsData as $data) {
            $data['alergenes'] = array_values($data['alergenes']);

            $plat = new Plat(
                plat_id: $data['plat_id'],
                plat_nom: $data['plat_nom'],
                type_plat: \App\Enum\TypePlat::from($data['type_plat']),
                photo: $data['photo'],
                alergenes: $data['alergenes']
            );

            $platsObjects[] = $plat;
        }

        return $platsObjects;
    }
}
