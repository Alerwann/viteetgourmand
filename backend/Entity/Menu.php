<?php

namespace App\Entity;

use JsonSerializable;

class Menu implements JsonSerializable

{
    private ?int $menu_id;
    private string $menu_nom;
    private int $nb_perso_min;
    private float $menu_prix;
    private string $description;
    private int $quantite_restante;
    private array $plat_id;
    private int $regime_id;
    private int $theme_id;
    private ?string $note_particuliere;
    private array $plats_details;

    public function __construct(
        string $menu_nom,
        int $nb_perso_min,
        float $menu_prix,
        string $description,
        int $quantite_restante,
        array $plat_id,
        int $regime_id,
        int $theme_id,
        ?int $menu_id = null,
        ?string $note_particuliere = "",
        array $plats_details = []
    ) {
        $this->menu_id = $menu_id;
        $this->menu_nom = $menu_nom;
        $this->nb_perso_min = $nb_perso_min;
        $this->menu_prix = $menu_prix;
        $this->description = $description;
        $this->quantite_restante = $quantite_restante;
        $this->plat_id = $plat_id;
        $this->regime_id = $regime_id;
        $this->theme_id = $theme_id;
        $this->note_particuliere = $note_particuliere;
        $this->plats_details = $plats_details;
    }

    // GET/SET Menu_id
    public function getMenuId(): ?int
    {
        return  $this->menu_id;
    }

    public function setMenuId(int $id): void
    {
        $this->menu_id = $id;
    }

    // GET/SET menu_nom
    public function getMenuNom(): string
    {
        return $this->menu_nom;
    }

    public function setMenuNom(string $menu_nom): void
    {
        $this->menu_nom = $menu_nom;
    }

    // GET/SET nombre de personne minimal

    public function getNbPersoMin(): int
    {
        return $this->nb_perso_min;
    }

    public function setNbPersoMin(int $nbMin): void
    {
        $this->nb_perso_min = $nbMin;
    }

    // GET/SET Prix par personne

    public function getPrix(): float
    {
        return $this->menu_prix;
    }

    public function setPrix(float $prix): void
    {
        $this->menu_prix = $prix;
    }

    // GET/SET description
    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    // GET/SET quantité
    public function getQuantite(): int
    {
        return $this->quantite_restante;
    }
    public function setQuantite(int $quantite_restante): void
    {
        $this->quantite_restante = $quantite_restante;
    }

    // GET/SET tableau des ids de plat
    public function getPlatId(): array
    {
        return $this->plat_id;
    }

    public function setPlatIds(array $platsId): void
    {
        $this->plat_id = $platsId;
    }

    // GET/SET régime ID

    public function getRegimeId(): int
    {
        return $this->regime_id;
    }

    public function setRegimeId(int $regimeId): void
    {
        $this->regime_id = $regimeId;
    }

    // GET/SET themeID

    public function getThemeId(): int
    {
        return $this->theme_id;
    }

    public function setThemeId(int $themeId): void
    {
        $this->theme_id = $themeId;
    }

    // GET/SET note particuliere

    public function getNoteParticuliere(): string
    {
        return $this->note_particuliere;
    }

    public function setNoteParticuliere(string $note): void
    {
        $this->note_particuliere = $note;
    }

    // GET/SET Plat détail
    public function getPlatsDetails(): array
    {
        return $this->plats_details;
    }

    public function setPlatsDetails(array $platsDetails): void
    {
        $this->plats_details = $platsDetails;
    }

    // Mise sous forme de tableau
    public function jsonSerialize(): array
    {
        return [
            "menu_id" => $this->menu_id,
            "menu_nom" => $this->menu_nom,
            "nb_perso_min" => $this->nb_perso_min,
            "menu_prix" => $this->menu_prix,
            "description" => $this->description,
            "quantite_restante" => $this->quantite_restante,
            "plat_id" => $this->plat_id,
            "regime_id" => $this->regime_id,
            "theme_id" => $this->theme_id,
            "note_particuliere" => $this->note_particuliere,
        ];
    }
}
