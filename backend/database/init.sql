
-- Initialisation de la Table Horaire 

CREATE TABLE IF NOT EXISTS horaire (
    horaire_id INT AUTO_INCREMENT PRIMARY KEY,
    jour VARCHAR(50) NOT NULL,
    heure_ouverture VARCHAR(50) NOT NULL,
    heure_fermeture VARCHAR(50) NOT NULL
);

INSERT INTO horaire (jour, heure_ouverture, heure_fermeture) VALUES
('lundi', '09:00', '18:00'),
('mardi', '09:00', '18:00'),
('mercredi', '09:00', '18:00'),
('jeudi', '09:00', '18:00'),
('vendredi', '09:00', '18:00'),
('samedi', '09:00', '18:00'),
('dimanche', '09:00', '18:00');