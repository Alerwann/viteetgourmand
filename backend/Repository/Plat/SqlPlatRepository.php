<?php

namespace App\Repository\Plat;

use App\Repository\Plat\PlatRepositoryInterface;
use App\Entity\Plat;
use App\Enum\TypePlat;
use Override;
use PDOStatement;
use PDO;




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

        try {
            $isUpdate = ($plat->getId() !== null && $plat->getId() != 0);
            $photoBinary = $plat->getPhoto(); // Récupéré directement de l'objet Plat

            if ($isUpdate) {
                if ($photoBinary !== null) {
                    $sql = "UPDATE plat SET plat_nom = :plat_nom, type_plat = :type_plat, photo = :photo WHERE plat_id = :plat_id";
                } else {
                    $sql = "UPDATE plat SET plat_nom = :plat_nom, type_plat = :type_plat WHERE plat_id = :plat_id";
                }
            } else {
                $sql = "INSERT INTO plat (plat_nom, type_plat, photo) VALUES (:plat_nom, :type_plat, :photo)";
            }

            $stmt = $this->pdo->prepare($sql);

            $stmt->bindValue(':plat_nom', $plat->getNom(), PDO::PARAM_STR);
            $stmt->bindValue(':type_plat', $plat->getTypePlat()->value, PDO::PARAM_STR);

            if (!$isUpdate || $photoBinary !== null) {
                $stmt->bindValue(':photo', $photoBinary, PDO::PARAM_LOB);
            }

            if ($isUpdate) {
                $stmt->bindValue(':plat_id', $plat->getId(), PDO::PARAM_INT);
            }

            $stmt->execute();

            $platId = $isUpdate ? $plat->getId() : (int)$this->pdo->lastInsertId();

            // Gestion de la table de liaison des allergènes
            $arrayAlergene = $plat->getAlergenes();

            // On supprime toujours les anciens pour les remplacer proprement
            $stmtDel = $this->pdo->prepare("DELETE FROM plat_alergene WHERE plat_id = :plat_id");
            $stmtDel->execute([':plat_id' => $platId]);

            if (!empty($arrayAlergene)) {
                $sqlJoint = "INSERT INTO plat_alergene (plat_id, alergene_id) VALUES (:plat_id, :alergene_id)";
                $stmtJoint = $this->pdo->prepare($sqlJoint);

                foreach ($arrayAlergene as $alergene) {
                    $alergeneId = is_array($alergene) ? $alergene['alergene_id'] : $alergene;
                    $stmtJoint->execute([
                        ':plat_id' => $platId,
                        ':alergene_id' => (int) $alergeneId
                    ]);
                }
            }

            $this->pdo->commit();
            return $platId;
        } catch (\Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
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

                // Vérifie si l'allergène n'est pas déjà présent par son ID
                $exists = false;
                foreach ($alergenesList as $existingAlergene) {
                    if ($existingAlergene['alergene_id'] === $alergeneId) {
                        $exists = true;
                        break;
                    }
                }

                if (!$exists) {
                    $alergenesList[] = [
                        "alergene_id" => $alergeneId,
                        "alergene_nom" => $row['alergene_nom']
                    ];
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
