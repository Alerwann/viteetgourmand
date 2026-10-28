-- Initialisation de la Table theme
CREATE TABLE IF NOT EXISTS theme(
    theme_id INT AUTO_INCREMENT PRIMARY KEY,
    theme_nom VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

