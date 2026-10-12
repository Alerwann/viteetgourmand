
CREATE TABLE IF NOT EXISTS regime(
    regime_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_regime VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO regime(nom_regime) VALUES 
('Classique'),
('vegan'),
('Végétarien');
