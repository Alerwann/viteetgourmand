CREATE TABLE modif_commande (
    modif_id INT AUTO_INCREMENT PRIMARY KEY,
    modif_contact VARCHAR(255),
    modif_description VARCHAR(255),
    commande_id INT NOT NULL,
    modif_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_modif_commande_id (commande_id),
    CONSTRAINT fk_modif_commande FOREIGN KEY (commande_id) REFERENCES commande(commande_id) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;