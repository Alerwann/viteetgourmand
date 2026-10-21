CREATE TABLE utilisateur (
    utilisateur_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    prenom VARCHAR(50) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    telephone VARCHAR(50) NOT NULL,
    numero_rue INT DEFAULT NULL,
    street VARCHAR(255) NOT NULL,
    code_postal INT DEFAULT NULL,
    ville VARCHAR(50) NOT NULL,
    pays VARCHAR(50) NOT NULL,   
    is_actif BOOLEAN DEFAULT TRUE,
    role_id INT NOT NULL, 
    CONSTRAINT fk_utilisateur_role FOREIGN KEY (role_id) REFERENCES role(role_id) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO utilisateur (email, password, prenom, nom, telephone, numero_rue, street, code_postal, ville, pays, is_actif, role_id) VALUES
('jean.dupont@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Jean', 'Dupont', '0601020304', 10, 'rue de la République', 75001, 'Chalon-sur-Saône', 'France', 1, 2),
('marie.curie@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Marie', 'Curie', '0605060708', 5, 'avenue de la Paix', 71000, 'Mâcon', 'France', 1, 2);