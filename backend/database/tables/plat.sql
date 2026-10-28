-- Initialisation de la Table plat 
CREATE TABLE plat(
    plat_id INT AUTO_INCREMENT PRIMARY KEY,
    plat_nom VARCHAR(50) NOT NULL UNIQUE,
    type_plat VARCHAR(50) NOT NULL,
    photo BLOB NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO plat(plat_nom,type_plat,photo) VALUES
('plat1','Entrée',X''),
('plat2','Plat',X''),
('dessert','Dessert',X'');