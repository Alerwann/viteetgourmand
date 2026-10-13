-- Initialisation de la table menu
CREATE TABLE menu (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(50) NOT NULL,
    nombre_personne_minimum INT NOT NULL,
    prix_par_personne DOUBLE NOT NULL,
    description VARCHAR(50) NOT NULL,
    quantite_restante INT NOT NULL,
    note_particuliere VARCHAR(255),
    regime_id INT NOT NULL,
    theme_id INT NOT NULL,
    CONSTRAINT fk_menu_regime FOREIGN KEY (regime_id) REFERENCES regime(regime_id) ON DELETE CASCADE,
    CONSTRAINT fk_menu_theme FOREIGN KEY (theme_id) REFERENCES theme(theme_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO menu(titre, nombre_personne_minimum,prix_par_personne, description,quantite_restante,note_particuliere, regime_id,theme_id) VALUES
('Menu Gourmand',4,15.00, 'Entrée, plat et dessert du terroir',20,'Le dessert est glacé, ne pas le stocker hors d\'un congélateur', 1,1),
('Menu Prestige',2,20.00, 'Menu de fête avec produits frais', 30,NULL, 1,1);

-- Table d'association pour avoir une liste de plat

CREATE TABLE menu_plat (
    menu_id INT NOT NULL,
    plat_id INT NOT NULL,
    PRIMARY KEY (menu_id, plat_id),
    CONSTRAINT fk_menu_plat_menu FOREIGN KEY (menu_id) REFERENCES menu(menu_id) ON DELETE CASCADE,
    CONSTRAINT fk_menu_plat_plat FOREIGN KEY (plat_id) REFERENCES plat(plat_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO menu_plat (menu_id, plat_id) VALUES
(1, 1), 
(2, 2);