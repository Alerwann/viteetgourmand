<?php

class Horaire {
    private ?int $id; 
    private string $jour;
    private string $heureOuverture;
    private string $heureFermeture;


    public function __construct(string $jour, string $heureOuverture, string $heureFermeture, ?int $id = null) {
        $this->id = $id;
        $this->jour = $jour;
        $this->heureOuverture = $heureOuverture;
        $this->heureFermeture = $heureFermeture;
    }

    // Le getter pour l'ID
    public function getId(): ?int {
        return $this->id;
    }

    public function getJour(): string {
        return $this->jour;
    }

    public function getHeureOuverture(): string {
        return $this->heureOuverture;
    }

    public function getHeureFermeture(): string {
        return $this->heureFermeture;
    }

    public function toArray(): array {
        return [
            "id" => $this->id,
            "jour" => $this->jour,
            "heure_ouverture" => $this->heureOuverture,
            "heure_fermeture" => $this->heureFermeture
        ];
    }
}