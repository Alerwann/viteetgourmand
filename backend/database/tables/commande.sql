-- Initialisation de la table commande
CREATE TABLE commande (
    commande_id INT AUTO_INCREMENT PRIMARY KEY,
    numero_commande VARCHAR(50) NOT NULL,
    date_commande DATE NOT NULL,
    date_prestation DATE NOT NULL,
    heure_livraison VARCHAR(50) NOT NULL,
    prix_menu DOUBLE NOT NULL,
    nombre_personne INT NOT NULL,
    prix_livraison DOUBLE NOT NULL,
    statut VARCHAR(50) NOT NULL,
    pret_materiel BOOLEAN NOT NULL,
    restitution_materiel BOOLEAN NOT NULL,
    utilisateur_id INT NOT NULL,
    menu_id INT,
    CONSTRAINT fk_commande_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(utilisateur_id) ON DELETE CASCADE,
    CONSTRAINT fk_commande_menu FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE
);

INSERT INTO commande (
    numero_commande, 
    date_commande, 
    date_prestation, 
    heure_livraison, 
    prix_menu, 
    nombre_personne, 
    prix_livraison, 
    statut, 
    pret_materiel, 
    restitution_materiel, 
    utilisateur_id, 
    menu_id
) VALUES
('CMD-2026-001', '2026-05-28', '2026-06-01', '12:00', 25.50, 4, 10.00, 'livre', 1, 0, 1, 1),
('CMD-2026-002', '2026-05-29', '2026-06-02', '12:30', 42.00, 2, 10.00, 'livre', 0, 0, 2, 2),
('CMD-2026-003', '2026-05-30', '2026-06-03', '19:00', 25.50, 6, 15.00, 'annule', 1, 0, 1, 1),
('CMD-2026-004', '2026-05-31', '2026-06-04', '12:15', 25.50, 3, 10.00, 'livre', 0, 0, 2, 1),
('CMD-2026-005', '2026-06-01', '2026-06-05', '13:00', 42.00, 5, 12.50, 'livre', 1, 1, 1, 2),
('CMD-2026-006', '2026-06-02', '2026-06-06', '20:00', 42.00, 4, 10.00, 'livre', 0, 0, 2, 2);