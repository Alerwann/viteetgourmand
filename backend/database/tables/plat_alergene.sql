-- Initialisation de la table de liaison plat_alergene
CREATE TABLE plat_alergene(
    plat_id INT NOT NULL,
    alergene_id INT NOT NULL,
    PRIMARY KEY (plat_id, alergene_id),
    CONSTRAINT fk_plat_alergene_alergene FOREIGN KEY (alergene_id) REFERENCES alergene(alergene_id) ON DELETE CASCADE,
    CONSTRAINT fk_plat_alergene_plat FOREIGN KEY (plat_id) REFERENCES plat(plat_id) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO plat_alergene VALUES(1,2),(1,3),(2,1);