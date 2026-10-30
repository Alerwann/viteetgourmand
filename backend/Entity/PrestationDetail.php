<?php

namespace App\Entity;

use App\Entity\AdressePostale;

class PrestationDetail
{
    private string $prestation_date;
    private string $prestation_heure;
    private AdressePostale $prestation_adresse;
    private float $livraison_prix;
    private bool $pret_materiel = \false;
    private bool $restitution_materiel = \false;

    public function __construct(string $prestation_date, string $prestation_heure, AdressePostale $prestation_adresse, float $livraison_prix, bool $pret_materiel, bool $restitution_materiel)
    {
        $this->prestation_date = $prestation_date;
        $this->prestation_heure = $prestation_heure;
        $this->prestation_adresse = $prestation_adresse;
        $this->livraison_prix = $livraison_prix;
        $this->pret_materiel = $pret_materiel;
        $this->restitution_materiel = $restitution_materiel;
    }

    public function getPrestationDate(): string
    {
        return $this->prestation_date;
    }

    public function getPrestionHeure(): string
    {
        return $this->prestation_heure;
    }
    public function getPrestationAdresse(): AdressePostale
    {
        return $this->prestation_adresse;
    }
    public function getLivraisonPrix(): float
    {
        return $this->livraison_prix;
    }
    public function getPretMateriel(): bool
    {
        return $this->pret_materiel;
    }
    public function getRestitutionMateriel(): bool
    {
        return $this->restitution_materiel;
    }
}
