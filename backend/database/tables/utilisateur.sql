-- Initialisation de la Table utilisateur 
CREATE TABLE utilisateur (
    utilisateur_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(50),
    prenom VARCHAR(50),
    telephone VARCHAR(50),
    ville VARCHAR(50),
    pays VARCHAR(50),
    adresse_postale VARCHAR(50),
    is_actif BOOLEAN DEFAULT TRUE,
    role_id INT NOT NULL, 
    CONSTRAINT fk_utilisateur_role FOREIGN KEY (role_id) REFERENCES role(role_id) 
);

INSERT INTO utilisateur (email, password, prenom, telephone, ville, pays, adresse_postale, is_actif, role_id) VALUES
('jean.dupont@email.com', '$2y$10$abcdefghijklmnopqrstuv', 'Jean', '0601020304', 'Chalon-sur-Saône', 'France', '10 rue de la République', 1, 2),
('marie.curie@email.com', '$2y$10$abcdefghijklmnopqrstuv', 'Marie', '0605060708', 'Mâcon', 'France', '5 avenue de la Paix', 1, 2);