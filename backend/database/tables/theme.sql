-- Initialisation de la Table theme
CREATE TABLE IF NOT EXISTS theme(
    theme_id INT AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

INSERT INTO theme(libelle) VALUES
('Classique'),
('Noël'),
('Pâques'),
('Événement');