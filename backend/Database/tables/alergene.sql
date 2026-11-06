-- Initialisation de la Table alergene 
CREATE TABLE IF NOT EXISTS alergene(
    alergene_id INT AUTO_INCREMENT PRIMARY KEY,
    alergene_nom VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

