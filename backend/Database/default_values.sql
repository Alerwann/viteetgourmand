-- Valeurs des horaires

INSERT INTO horaire (jour, heure_ouverture, heure_fermeture) VALUES
('lundi', '09:00', '18:00'),
('mardi', '09:00', '18:00'),
('mercredi', '09:00', '18:00'),
('jeudi', '09:00', '18:00'),
('vendredi', '09:00', '18:00'),
('samedi', '09:00', '18:00'),
('dimanche', '09:00', '18:00');


-- Valeur des Roles

INSERT INTO role(role_nom) VALUES
('admin'),
('utilisateur'),
('employé');


-- Valeur des régimes 
INSERT INTO regime(regime_nom) VALUES 
('Classique'),
('vegan'),
('Végétarien');

-- Valeur des Thèmes
INSERT INTO theme(theme_nom) VALUES
('Classique'),
('Noël'),
('Pâques'),
('Événement');

-- Valeur des Alergènes
INSERT INTO alergene(alergene_nom) VALUES
('Fruits de mer'),
('Fruits à coque'),
('Lactose'),
('Gluten'),
('arachide');

-- Valeur des utilisateurs

INSERT INTO utilisateur (email, password, prenom, nom, telephone, numero_rue, street, code_postal, ville, pays, is_actif, role_id) VALUES
('jean.dupont@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Jean', 'Dupont', '0601020304', 10, 'rue de la République', 75001, 'Chalon-sur-Saône', 'France', 1, 2),
('marie.curie@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Marie', 'Curie', '0605060708', 5, 'avenue de la Paix', 71000, 'Mâcon', 'France', 1, 2);

-- Valeur des plats

INSERT INTO plat(plat_nom,type_plat,photo) VALUES
('plat1','Entrée',X''),
('plat2','Plat',X''),
('dessert','Dessert',X'');

-- Valeur duo Plat Alergène
INSERT INTO plat_alergene VALUES(1,2),(1,3),(2,1);

-- Valeur des menus
INSERT INTO menu(menu_nom, nb_perso_min,menu_prix, description,quantite_restante,note_particuliere, regime_id,theme_id) VALUES
('Menu Gourmand',4,15.00, 'Entrée, plat et dessert du terroir',20,'Le dessert est glacé, ne pas le stocker hors d''un congélateur', 2,1),
('Menu Prestige',2,20.00, 'Menu de fête avec produits frais', 30,NULL, 1,1);

-- Valeur des menus_plats
INSERT INTO menu_plat (menu_id, plat_id) VALUES
(1, 1),
(1,2), 
(1,3),
(2, 2);

-- Valeur de Commande

INSERT INTO commande (
    commande_id,
    commande_ref, 
    commande_date, 
    prestation_date, 
    prestation_heure,
    numero_rue,
    street,
    code_postal,
    ville,
    pays,
    nombre_personne, 
    livraison_prix, 
    commande_status,
    pret_materiel, 
    restitution_materiel, 
    utilisateur_id, 
    menu_id
) VALUES
(1,'CMD-2026-001', '2026-05-28', '2026-06-01', '12:00',10, 'rue de la République', 75001, 'Chalon-sur-Saône', 'France', 4, 10.00, 'accepte', 1, 0, 1, 1),
(2,'CMD-2026-002', '2026-05-29', '2026-06-02', '12:30',10, 'rue de la République', 75001, 'Chalon-sur-Saône', 'France',  2, 10.00, 'livre', 0, 0, 2, 2),
(3,'CMD-2026-003', '2026-05-30', '2026-06-03', '19:00',10, 'rue de la République', 75001, 'Chalon-sur-Saône', 'France',  6, 15.00, 'preparation', 1, 0, 1, 1),
(4,'CMD-2026-004', '2026-05-31', '2026-06-04', '12:15',10, 'rue de la République', 75001, 'Chalon-sur-Saône', 'France',  3, 10.00, 'livraison', 0, 0, 2, 1),
(5,'CMD-2026-005', '2026-06-01', '2026-06-05', '13:00',10, 'rue de la République', 75001, 'Chalon-sur-Saône', 'France',  5, 12.50, 'attente_materiel', 1, 1, 1, 2),
(6,'CMD-2026-006', '2026-06-02', '2026-06-06', '20:00', 10, 'rue de la République', 75001, 'Chalon-sur-Saône', 'France', 4, 10.00, 'ternmine', 0, 0, 2, 2);

-- Valeur pour avis

INSERT INTO avis(note, description, status, commande_id) VALUES
(5, 'Super repas pour notre événement, tout le monde s est régalé !', 'publie', 1),
(4, 'Très bonne prestation, livraison ponctuelle.', 'publie', 2),
(1, 'Problème lors de la livraison, le repas est arrivé froid.', 'refuse', 3),
(5, 'Super repas pour notre événement, tout le monde s est régalé !', 'publie', 4),
(3, 'Très bonne prestation, livraison ponctuelle.', 'publie', 5),
(2, 'Problème lors de la livraison, le repas est arrivé froid.', 'refuse', 6);

