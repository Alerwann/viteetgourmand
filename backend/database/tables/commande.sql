-- Initialisation de la table commande
CREATE TABLE commande (
    commande_id INT AUTO_INCREMENT PRIMARY KEY,
    commande_ref VARCHAR(50) NOT NULL,
    prestation_date DATE NOT NULL,
    prestation_heure VARCHAR(50) NOT NULL,
    numero_rue INT DEFAULT NULL,
    street VARCHAR(255) NOT NULL,
    code_postal INT DEFAULT NULL,
    ville VARCHAR(50) NOT NULL,
    pays VARCHAR(50) NOT NULL,
    nombre_personne INT NOT NULL,
    livraison_prix DOUBLE NOT NULL,
    commande_status VARCHAR(50) NOT NULL,
    pret_materiel BOOLEAN NOT NULL,
    restitution_materiel BOOLEAN NOT NULL,
    utilisateur_id INT NOT NULL,
    menu_id INT NOT NULL,
    commande_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_utilisateur_id (utilisateur_id),
    INDEX idx_menu_id (menu_id),
    CONSTRAINT fk_commande_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(utilisateur_id),
    CONSTRAINT fk_commande_menu FOREIGN KEY (menu_id) REFERENCES menu(menu_id) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


