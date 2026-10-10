<?php

class Menus
{
    private ?int $menu_id;
    private string $title;
    private int $nb_perso_min;
    private float $prix;
    private string $description;
    private int $quantite;
    private int $plat_id;
    private int $regime_id;
    private int $theme_id;

    public function __construct(string $title, int $nb_perso_min, float $prix, string $description, int $quantite, int $plat_id, int $regime_id, int $theme_id, ?int $menu_id = null)
    {
        $this->menu_id = $menu_id;
        $this->title = $title;
        $this->nb_perso_min = $nb_perso_min;
        $this->prix = $prix;
        $this->description = $description;
        $this->quantite = $quantite;
        $this->plat_id = $plat_id;
        $this->regime_id = $regime_id;
        $this->theme_id = $theme_id;
    }

    public function getMenuId(): ?int
    {
        return  $this->menu_id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getNbPersoMin(): int
    {
        return $this->nb_perso_min;
    }

    public function getPrix(): float
    {
        return $this->prix;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getQuantite(): int
    {
        return $this->quantite;
    }

    public function getPlatId(): int
    {
        return $this->plat_id;
    }

    public function getRegimeId(): int
    {
        return $this->regime_id;
    }

    public function getThemeId(): int
    {
        return $this->theme_id;
    }

    public function toArray(): array
    {
        return [
            "menu_id" => $this->menu_id,
            "title" => $this->title,
            "nb_perso_min" => $this->nb_perso_min,
            "prix" => $this->prix,
            "description" => $this->description,
            "quantite" => $this->quantite,
            "plat_id" => $this->plat_id,
            "regime_id" => $this->regime_id,
            "theme_id" => $this->theme_id,
        ];
    }
}
