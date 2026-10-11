-- Initialisation de la Table alergene 
CREATE TABLE IF NOT EXISTS alergene(
    alergene_id INT AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

INSERT INTO alergene(libelle) VALUES
('aucun'),
('arachide');