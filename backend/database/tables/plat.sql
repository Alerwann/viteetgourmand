-- Initialisation de la Table plat 
CREATE TABLE plat(
    plat_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_plat VARCHAR(50) NOT NULL UNIQUE,
    type_plat ENUM('Entrée', 'Plat', 'Dessert') NOT NULL,
    photo BLOB NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO plat(nom_plat,type_plat,photo) VALUES
('plat1','Entrée',X''),
('plat2','Plat',X''),
('dessert','Dessert',X'');