<?php

class Horaire {
    private ?int $horaire_id; 
    private string $jour;
    private string $heure_ouverture;
    private string $heure_fermeture;


    public function __construct(string $jour, string $heure_ouverture, string $heure_fermeture, ?int $horaire_id = null) {
        $this->horaire_id = $horaire_id;
        $this->jour = $jour;
        $this->heure_ouverture = $heure_ouverture;
        $this->heure_fermeture = $heure_fermeture;
    }

    public function getId(): ?int {
        return $this->horaire_id;
    }

    public function getJour(): string {
        return $this->jour;
    }

    public function getHeureOuverture(): string {
        return $this->heure_ouverture;
    }

    public function getHeureFermeture(): string {
        return $this->heure_fermeture;
    }

    public function toArray(): array {
        return [
            "horaire_id" => $this->horaire_id,
            "jour" => $this->jour,
            "heure_ouverture" => $this->heure_ouverture,
            "heure_fermeture" => $this->heure_fermeture
        ];
    }
}