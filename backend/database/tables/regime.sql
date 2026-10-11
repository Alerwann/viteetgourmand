
CREATE TABLE IF NOT EXISTS regime(
    regime_id INT AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

INSERT INTO regime(libelle) VALUES 
('Classique'),
('vegan'),
('Végétarien');
