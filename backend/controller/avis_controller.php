<?php


require_once __DIR__ . '/../classes/Avis.php';

class AvisController
{

    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }


    public function getAllAvis(): void
    {

        try {
            $stmt = $this->pdo->query("SELECT avis_id, description, status,note FROM avis");
            $listAvis = [];

            error_log("✅ tout est récupéré");


            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $avisObj = new Avis(
                    avis_id: (int) $row['avis_id'],
                    description: $row['description'],
                    status: $row['status'],
                    note: (int)$row['note']
                );

                $listAvis[] = $avisObj->toArray();
            }

            http_response_code(200);
            echo json_encode($listAvis);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getSelectAvis(): void
    {
        $limite = isset($_GET['limite']) ? (int) $_GET['limite'] : 5;
        try {
            $stmt = $this->pdo->prepare("SELECT avis_id,description, status,note FROM avis ORDER BY created_at DESC LIMIT :limite ");
            $stmt->bindValue(':limite', $limite, PDO::PARAM_INT);
            $stmt->execute();

            $listAvis = [];


            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $avisObj = new Avis(
                    description: $row['description'],
                    status: $row['status'],
                    note: (int)$row['note'],
                    avis_id: (int) $row['avis_id']

                );

                $listAvis[] = $avisObj->toArray();
            }

            http_response_code(200);
            echo json_encode($listAvis);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getAvisbyStatus(): void
    {
        $statusIN = isset($_GET['status']) ? $_GET['status'] : 'cree';

        $statusEnum = StatusAvis::tryFrom($statusIN);

        if ($statusEnum === null) {
            throw new \InvalidArgumentException("Statut invalide : " . $statusIN);
        }

        try {
            $stmt = $this->pdo->prepare("SELECT description,note FROM avis WHERE status= :status");
            $stmt->bindValue(':status', $statusEnum->value, PDO::PARAM_STR);
            $stmt->execute();

            $listAvis = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $avisTab = [
                    "description" => $row['description'],
                    "note" => (int)$row['note']
                ];

                $listAvis[] = $avisTab;
            }

            http_response_code(200);
            echo json_encode($listAvis);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function createAvis(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data) || !isset($data['description'], $data['status'], $data['note'])) {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes ( description, status, note)."]);
            return;
        }

        $statusString = $data['status'] ?? 'cree';

        $statusEnum = StatusAvis::tryFrom($statusString);

        if ($statusEnum === null) {
            throw new \InvalidArgumentException("Statut invalide : " . $statusString);
        }

        try {
            $stmt = $this->pdo->prepare("INSERT INTO avis (description,status,note) VALUES (:description,:status,:note)");
            $stmt->execute([':description' => $data['description'], ':status' => $data['status'], ':note' => $data['note']]);
            http_response_code(201);
            echo json_encode([
                "message" => "Avis créé avec succès !",
                "id" => (int) $this->pdo->lastInsertId()
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }
}
