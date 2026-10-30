-- Initialisation de la table commande
CREATE TABLE commande (
    commande_id INT AUTO_INCREMENT PRIMARY KEY,
    commande_ref VARCHAR(50) NOT NULL,
    date_prestation DATE NOT NULL,
    heure_livraison VARCHAR(50) NOT NULL,
    nombre_personne INT NOT NULL,
    prix_livraison DOUBLE NOT NULL,
    statut VARCHAR(50) NOT NULL,
    pret_materiel BOOLEAN NOT NULL,
    restitution_materiel BOOLEAN NOT NULL,
    utilisateur_id INT NOT NULL,
    menu_id INT NOT NULL,
    commande_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_commande_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(utilisateur_id),
    CONSTRAINT fk_commande_menu FOREIGN KEY (menu_id) REFERENCES menu(menu_id) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


