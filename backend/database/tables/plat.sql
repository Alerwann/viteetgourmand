-- Initialisation de la Table plat 
CREATE TABLE plat(
    plat_id INT AUTO_INCREMENT PRIMARY KEY,
    titre_plat VARCHAR(50) NOT NULL,
    type_plat VARCHAR(50) NOT NULL,
    photo VARCHAR(50) NOT NULL
);

INSERT INTO plat(titre_plat,type_plat,photo) VALUES
('coucou','entree','fofo'),
('coucou','plat','fofo');