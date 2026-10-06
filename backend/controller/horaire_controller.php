<?php

require_once __DIR__ . '/../classes/Horaire.php';

class HoraireController {
    private PDO $pdo;


    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getAll(): array {
        $stmt = $this->pdo->query("SELECT horaire_id, jour, heure_ouverture, heure_fermeture FROM horaire");
        
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


    public function saveOrUpdate(array $data): array {
   
        $horaireId = $data['horaire_id'] ?? null;

        if ($horaireId) {
       
            $query = "UPDATE horaire SET jour = :jour, heure_ouverture = :ouverture, heure_fermeture = :fermeture WHERE horaire_id = :id";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute([
                ':id' => $horaireId,
                ':jour' => $data['jour'],
                ':ouverture' => $data['heure_ouverture'],
                ':fermeture' => $data['heure_fermeture']
            ]);
            return ["message" => "Horaire mis à jour avec succès !"];
        } else {
           
            $query = "INSERT INTO horaire (jour, heure_ouverture, heure_fermeture) VALUES (:jour, :ouverture, :fermeture)";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute([
                ':jour' => $data['jour'],
                ':ouverture' => $data['heure_ouverture'],
                ':fermeture' => $data['heure_fermeture']
            ]);
            return ["message" => "Horaire créé avec succès !"];
        }
    }
}