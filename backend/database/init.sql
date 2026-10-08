-- Initialisation de la Table Horaire 
CREATE TABLE IF NOT EXISTS horaire (
    horaire_id INT AUTO_INCREMENT PRIMARY KEY,
    jour VARCHAR(50) NOT NULL UNIQUE,
    heure_ouverture VARCHAR(50) NOT NULL,
    heure_fermeture VARCHAR(50) NOT NULL
);

INSERT INTO horaire (jour, heure_ouverture, heure_fermeture) VALUES
('lundi', '09:00', '18:00'),
('mardi', '09:00', '18:00'),
('mercredi', '09:00', '18:00'),
('jeudi', '09:00', '18:00'),
('vendredi', '09:00', '18:00'),
('samedi', '09:00', '18:00'),
('dimanche', '09:00', '18:00');


-- Initialisation de la Table regime
CREATE TABLE IF NOT EXISTS regime(
    regime_id INT AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

INSERT INTO regime(libelle) VALUES 
('Classique'),
('vegan'),
('Végétarien');


-- Initialisation de la Table theme
CREATE TABLE IF NOT EXISTS theme(
    theme_id INT AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

INSERT INTO theme(libelle) VALUES
('Classique'),
('Noël'),
('Pâques'),
('Événement');


-- Initialisation de la Table Role
CREATE TABLE IF NOT EXISTS role(
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

INSERT INTO role(libelle) VALUES
('admin'),
('utilisateur'),
('employé');


-- Initialisation de la Table avis
CREATE TABLE IF NOT EXISTS avis(
    avis_id INT AUTO_INCREMENT PRIMARY KEY,
    note VARCHAR(50) NOT NULL,
    description VARCHAR(550) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO avis(note,description,status) VALUES
('3','la nourriture est bonne mais jai eu des problèmes de liaison','publie'),
('5','nous nous sommes régalé','cree'),
('0','je ne recommande pas','non_valide');

-- Initialisation de la Table utilisateur 
CREATE TABLE utilisateur (
    utilisateur_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50),
    password VARCHAR(50),
    prenom VARCHAR(50),
    telephone VARCHAR(50),
    ville VARCHAR(50),
    pays VARCHAR(50),
    adresse_postale VARCHAR(50),
    role_id INT NOT NULL, 
    CONSTRAINT fk_utilisateur_role FOREIGN KEY (role_id) REFERENCES role(role_id)
);


-- Initialisation de la Table alergene 
CREATE TABLE IF NOT EXISTS alergene(
    alergene_id INT AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

INSERT INTO alergene(libelle) VALUES
('aucun'),
('arachide');


-- Initialisation de la Table plat 
CREATE TABLE plat(
    plat_id INT AUTO_INCREMENT PRIMARY KEY,
    titre_plat VARCHAR(50) NOT NULL,
    photo BLOB
);


-- Initialisation de la table de liaison plat_alergene
CREATE TABLE plat_alergene(
    plat_id INT NOT NULL,
    alergene_id INT NOT NULL,
    PRIMARY KEY (plat_id, alergene_id),
    CONSTRAINT fk_plat_alergene_alergene FOREIGN KEY (alergene_id) REFERENCES alergene(alergene_id) ON DELETE CASCADE,
    CONSTRAINT fk_plat_alergene_plat FOREIGN KEY (plat_id) REFERENCES plat(plat_id) ON DELETE CASCADE
);


-- Initialisation de la table menu
CREATE TABLE menu (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(50) NOT NULL,
    nombre_personne_minimum INT NOT NULL,
    prix_par_personne DOUBLE NOT NULL,
    description VARCHAR(50) NOT NULL,
    quantite_restante INT NOT NULL,
    plat_id INT NOT NULL,
    regime_id INT NOT NULL,
    theme_id INT NOT NULL,
    CONSTRAINT fk_menu_regime FOREIGN KEY (regime_id) REFERENCES regime(regime_id) ON DELETE CASCADE,
    CONSTRAINT fk_menu_theme FOREIGN KEY (theme_id) REFERENCES theme(theme_id) ON DELETE CASCADE,
    CONSTRAINT fk_menu_plat FOREIGN KEY (plat_id) REFERENCES plat(plat_id) ON DELETE CASCADE
);


-- Initialisation de la table commande
CREATE TABLE commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
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