<?php

namespace App\Repository\Theme;

use App\Entity\Theme;

interface ThemeRepositoryInterface
{
    public function getAll(): array;
    public function getOne(int $themeId): Theme;
    public function save(Theme $theme): void;
    public function delete(int $themeId): void;
}
