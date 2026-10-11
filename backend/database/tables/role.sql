-- Initialisation de la Table Role
CREATE TABLE IF NOT EXISTS role(
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

INSERT INTO role(libelle) VALUES
('admin'),
('utilisateur'),
('employé');