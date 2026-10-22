CREATE TABLE session_token(
    token VARCHAR(255) PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    expire_at DATETIME NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_utilisateurs_token FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(utilisateur_id) ON DELETE CASCADE
) ENGINE=InnoDB;
