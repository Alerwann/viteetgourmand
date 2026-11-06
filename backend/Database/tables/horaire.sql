CREATE TABLE IF NOT EXISTS horaire (
    horaire_id INT AUTO_INCREMENT PRIMARY KEY,
    jour VARCHAR(50) NOT NULL UNIQUE,
    heure_ouverture VARCHAR(50) NOT NULL,
    heure_fermeture VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
