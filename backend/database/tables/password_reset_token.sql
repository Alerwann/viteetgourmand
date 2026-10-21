CREATE TABLE password_reset_token(
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    expire_at DATETIME NOT NULL,
    utilisateur_id INT NOT NULL UNIQUE,
    CONSTRAINT fk_utilisateur_token FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(utilisateur_id) ON DELETE CASCADE
) ENGINE=InnoDB;