<?php

namespace App\Repository;

use PDO;
use PDOStatement;
use App\Entity\Theme;
use App\Repository\ThemeRepositoryInterface;
use Override;

require_once __DIR__ . '/ThemeRepositoryInterface.php';

class SqlThemeRepository implements ThemeRepositoryInterface
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }


    #[Override]
    public function getAll(): array
    {
        $stmt = $this->pdo->query("SELECT  theme_id, theme_nom FROM theme");
        return $this->hydrateTheme($stmt);
    }

    #[Override]
    public function getOne(int $themeId): Theme
    {
        $stmt = $this->pdo->prepare("SELECT  theme_id, theme_nom FROM theme WHERE theme_id= :theme_id");
        $stmt->execute([$themeId]);
        $themes = $this->hydrateTheme($stmt);
        return isset($themes) ? $themes[0] : [];
    }

    #[Override]
    public function save(Theme $theme): void
    {
        if ($theme->getThemeId() !== null) {
            $stmt = $this->pdo->prepare("UPDATE theme set ( theme_nom= :theme_nom) WHERE theme_id = :theme_id");
            $params = [':theme_id' => $theme->getThemeId(), ':theme_nom' => $theme->getThemeNom()];
        } else {
            $stmt = $this->pdo->prepare("INSERT INTO theme (theme_nom) VALUES (:theme_nom)");
            $params = [':theme_nom' => $theme->getThemeNom()];
        }
        $stmt->execute($params);
    }

    #[Override]
    public function delete(int $themeId): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM theme WHERE theme_id = :id");
        $stmt->execute([$themeId]);
    }

    private function hydrateTheme(PDOStatement $stmt): array
    {
        $themes = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

            $themeObj = [
                'theme_id' => (int)$row['theme_id'],
                'theme_nom' => $row['theme_nom']
            ];

            $themes[] = $themeObj;
        }

        return $themes;
    }
}
