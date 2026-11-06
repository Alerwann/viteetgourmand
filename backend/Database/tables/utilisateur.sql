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

