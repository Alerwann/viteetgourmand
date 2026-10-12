-- Initialisation de la Table avis
CREATE TABLE IF NOT EXISTS avis(
    avis_id INT AUTO_INCREMENT PRIMARY KEY,
    note INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    commande_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
    CONSTRAINT fk_commande_id FOREIGN KEY (commande_id) REFERENCES commande(commande_id) ON DELETE RESTRICT,
    CONSTRAINT uk_commande_avis UNIQUE (commande_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO avis(note, description, status, commande_id) VALUES
(5, 'Super repas pour notre événement, tout le monde s est régalé !', 'publie', 1),
(4, 'Très bonne prestation, livraison ponctuelle.', 'publie', 2),
(1, 'Problème lors de la livraison, le repas est arrivé froid.', 'refuse', 3),
(5, 'Super repas pour notre événement, tout le monde s est régalé !', 'publie', 4),
(3, 'Très bonne prestation, livraison ponctuelle.', 'publie', 5),
(2, 'Problème lors de la livraison, le repas est arrivé froid.', 'refuse', 6);