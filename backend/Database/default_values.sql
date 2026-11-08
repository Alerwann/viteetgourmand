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
('Gluten'),
('Crustacés'),
('Œufs'),
('Poissons'),
('Arachides'),
('Soja'),
('Lait'),
('Fruits à coque'),
('Céleri'),
('Moutarde');

-- Valeur des utilisateurs

INSERT INTO utilisateur (email, password, prenom, nom, telephone, numero_rue, street, code_postal, ville, pays, is_actif, role_id) VALUES
('jean.dupont@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Jean', 'Dupont', '0601020304', 10, 'rue de la République', 75001, 'Chalon-sur-Saône', 'France', 1, 2),
('marie.curie@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Marie', 'Curie', '0605060708', 5, 'avenue de la Paix', 71000, 'Mâcon', 'France', 1, 2),
('pierre.martin@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Pierre', 'Martin', '0611121314', 12, 'boulevard Carnot', 71100, 'Chalon-sur-Saône', 'France', 1, 2),
('sophie.bernard@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Sophie', 'Bernard', '0621222324', 8, 'rue du Port', 71200, 'Le Creusot', 'France', 1, 2),
('lucas.petit@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Lucas', 'Petit', '0631323334', 25, 'avenue de Verdun', 71300, 'Montceau-les-Mines', 'France', 1, 2),
('chloe.robert@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Chloé', 'Robert', '0641424344', 3, 'place de l''Hôtel de Ville', 71500, 'Louhans', 'France', 1, 2),
('thomas.richard@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Thomas', 'Richard', '0651525354', 14, 'rue Gambetta', 71600, 'Paray-le-Monial', 'France', 1, 2),
('emma.durand@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Emma', 'Durand', '0661626364', 7, 'rue Victor Hugo', 71400, 'Autun', 'France', 1, 2),
('nicolas.moreau@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Nicolas', 'Moreau', '0671727374', 19, 'cours General de Gaulle', 71000, 'Mâcon', 'France', 1, 2),
('camille.simon@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Camille', 'Simon', '0681828384', 31, 'rue Pasteur', 71100, 'Chalon-sur-Saône', 'France', 1, 2),
('antoine.laurent@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Antoine', 'Laurent', '0691929394', 45, 'route de Lyon', 71000, 'Mâcon', 'France', 1, 2),
('sarah.michel@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Sarah', 'Michel', '0610203040', 2, 'rue aux Fèvres', 71100, 'Chalon-sur-Saône', 'France', 1, 2),
('julien.garcia@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Julien', 'Garcia', '0620304050', 11, 'rue Saint-Jean', 71400, 'Autun', 'France', 1, 2),
('laura.david@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Laura', 'David', '0630405060', 6, 'place Saint-Nizier', 71100, 'Chalon-sur-Saône', 'France', 1, 2),
('maxime.bertrand@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Maxime', 'Bertrand', '0640506070', 22, 'rue de Paris', 71200, 'Le Creusot', 'France', 1, 2),
('manon.roux@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Manon', 'Roux', '0650607080', 9, 'avenue Jean Jaurès', 71300, 'Montceau-les-Mines', 'France', 1, 2),
('alexandre.vincent@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Alexandre', 'Vincent', '0660708090', 18, 'rue de la République', 71500, 'Louhans', 'France', 1, 2),
('pauline.fournier@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Pauline', 'Fournier', '0670809000', 4, 'rue Carnot', 71600, 'Paray-le-Monial', 'France', 1, 2),
('guillaume.morel@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Guillaume', 'Morel', '0680900011', 27, 'quai Gambetta', 71100, 'Chalon-sur-Saône', 'France', 1, 2),
('audrey.girard@email.com', '$2y$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV0123456789xyz', 'Audrey', 'Girard', '0690001122', 15, 'rue Foch', 71000, 'Mâcon', 'France', 1, 2);

-- Valeur des plats

INSERT INTO plat(plat_nom,type_plat,photo) VALUES
('Poulet de Bresse à la crème', 'Plat', X''),
('Bœuf bourguignon', 'Plat', X''),
('Œufs en meurette', 'Entrée', X''),
('Fondue bressane', 'Plat', X''),
('Gougères au Comté', 'Entrée', X''),
('Quiche lorraine', 'Entrée', X''),
('Blanquette de veau', 'Plat', X''),
('Pot-au-feu', 'Plat', X''),
('Hachis parmentier', 'Plat', X''),
('Cassoulet', 'Plat', X''),
('Bouillabaisse', 'Plat', X''),
('Galette complète', 'Plat', X''),
('Salade niçoise', 'Entrée', X''),
('Tartiflette', 'Plat', X''),
('Raclette', 'Plat', X''),
('Magret de canard', 'Plat', X''),
('Choucroute garnie', 'Plat', X''),
('Tarte tatin', 'Dessert', X''),
('Crème brûlée', 'Dessert', X''),
('Mousse au chocolat', 'Dessert', X''),
('Île flottante', 'Dessert', X''),
('Profiteroles au chocolat', 'Dessert', X''),
('Tarte au citron meringuée', 'Dessert', X''),
('Éclair au chocolat', 'Dessert', X''),
('Fondant au chocolat', 'Dessert', X''),
('Baba au rhum', 'Dessert', X''),
('Crêpes suzette', 'Dessert', X''),
('Financier aux amandes', 'Dessert', X'');


-- Valeur duo Plat Alergène
INSERT INTO plat_alergene (plat_id, alergene_id) VALUES
-- Poulet de Bresse à la crème (ID 1)
(1, 7),  -- Lait
(1, 10), -- Moutarde

-- Bœuf bourguignon (ID 2)
(2, 9),  -- Céleri

-- Œufs en meurette (ID 3)
(3, 3),  -- Œufs
(3, 1),  -- Gluten
(3, 7),  -- Lait

-- Fondue bressane (ID 4)
(4, 3),  -- Œufs
(4, 7),  -- Lait

-- Gougères au Comté (ID 5)
(5, 1),  -- Gluten
(5, 3),  -- Œufs
(5, 7),  -- Lait

-- Blanquette de veau (ID 7)
(7, 7),  -- Lait
(7, 9),  -- Céleri

-- Pot-au-feu (ID 8)
(8, 9),  -- Céleri

-- Hachis parmentier (ID 9)
(9, 7),  -- Lait

-- Cassoulet (ID 10)
(10, 1), -- Gluten

-- Bouillabaisse (ID 11)
(11, 4), -- Poissons
(11, 2), -- Crustacés
(11, 9), -- Céleri

-- Galette complète (ID 12)
(12, 3), -- Œufs
(12, 7), -- Lait

-- Salade niçoise (ID 13)
(13, 4), -- Poissons
(13, 3), -- Œufs

-- Tartiflette (ID 14)
(14, 7), -- Lait

-- Raclette (ID 15)
(15, 7), -- Lait

-- Choucroute garnie (ID 17)
(17, 9), -- Céleri
(17, 10),-- Moutarde

-- Tarte tatin (ID 18)
(18, 1), -- Gluten
(18, 7), -- Lait

-- Crème brûlée (ID 19)
(19, 3), -- Œufs
(19, 7), -- Lait

-- Mousse au chocolat (ID 20)
(20, 3), -- Œufs
(20, 7), -- Lait

-- Île flottante (ID 21)
(21, 3), -- Œufs
(21, 7), -- Lait

-- Profiteroles au chocolat (ID 22)
(22, 1), -- Gluten
(22, 3), -- Œufs
(22, 7), -- Lait

-- Tarte au citron meringuée (ID 23)
(23, 1), -- Gluten
(23, 3), -- Œufs
(23, 7), -- Lait

-- Éclair au chocolat (ID 24)
(24, 1), -- Gluten
(24, 3), -- Œufs
(24, 7), -- Lait

-- Fondant au chocolat (ID 25)
(25, 1), -- Gluten
(25, 3), -- Œufs
(25, 7), -- Lait

-- Baba au rhum (ID 26)
(26, 1), -- Gluten
(26, 3), -- Œufs
(26, 7), -- Lait

-- Crêpes suzette (ID 27)
(27, 1), -- Gluten
(27, 3), -- Œufs
(27, 7), -- Lait

-- Financier aux amandes (ID 28)
(28, 1), -- Gluten
(28, 3), -- Œufs
(28, 7), -- Lait
(28, 8); -- Fruits à coque


-- Valeur des menus
INSERT INTO menu(menu_nom, nb_perso_min,menu_prix, description,quantite_restante,note_particuliere, regime_id,theme_id) VALUES
('Menu Traditionnel Bressan', 2, 35.00, 'Entrée, poulet de Bresse, dessert', 10, 'Sur commande 48h à l''avance', 1, 1),
('Menu Végétarien du Marché', 1, 28.50, 'Salade fraîche, légumes de saison, dessert vegan', 15, '100% végétal', 2, 2),
('Menu Dégustation Terroir', 4, 55.00, 'Œufs en meurette, bœuf bourguignon, dessert', 8, 'Accord mets et vins possible', 1, 3),
('Menu Sans Gluten & Saveurs', 2, 32.00, 'Velouté, poisson du jour, dessert sans gluten', 12, 'Certifié sans gluten', 3, 4),
('Menu Express du Midi', 1, 19.90, 'Plat du jour et café gourmand', 20, 'Uniquement le midi en semaine', 1, 1),
('Menu Douceur Végé', 2, 29.00, 'Soupe de saison, galette complète, dessert', 10, 'Options végétariennes riches en protéines', 2, 2),
('Menu Prestige Bourguignon', 4, 68.00, 'Entrée fine, volaille de Bresse aux morilles, dessert', 5, 'Réservation obligatoire', 1, 3),
('Menu Léger & Équilibre', 1, 26.00, 'Salade composée, blanc de poulet grillé, fruits frais', 14, 'Faible en calories', 3, 4),
('Menu Festif de Saison', 6, 45.00, 'Assortiment d''entrées, plat mijoté, dessert festif', 6, 'Idéal pour les groupes', 1, 3),
('Menu Bio & Vert', 2, 31.00, '100% bio, soupe, plat végétarien, dessert maison', 11, 'Produits locaux et biologiques', 2, 2);

-- Valeur des menus_plats
INSERT INTO menu_plat (menu_id, plat_id) VALUES
-- Menu 1
(1, 3),  -- Œufs en meurette (Entrée)
(1, 1),  -- Poulet de Bresse à la crème (Plat)
(1, 18), -- Tarte tatin (Dessert)

-- Menu 2
(2, 5),  -- Gougères au Comté (Entrée)
(2, 4),  -- Fondue bressane (Plat)
(2, 19), -- Crème brûlée (Dessert)

-- Menu 3
(3, 6),  -- Quiche lorraine (Entrée)
(3, 2),  -- Bœuf bourguignon (Plat)
(3, 20), -- Mousse au chocolat (Dessert)

-- Menu 4
(4, 13), -- Salade niçoise (Entrée)
(4, 7),  -- Blanquette de veau (Plat)
(4, 21), -- Île flottante (Dessert)

-- Menu 5
(5, 3),  -- Œufs en meurette (Entrée)
(5, 9),  -- Hachis parmentier (Plat)
(5, 22), -- Profiteroles au chocolat (Dessert)

-- Menu 6
(6, 5),  -- Gougères au Comté (Entrée)
(6, 12), -- Galette complète (Plat)
(6, 23), -- Tarte au citron meringuée (Dessert)

-- Menu 7
(7, 6),  -- Quiche lorraine (Entrée)
(7, 1),  -- Poulet de Bresse à la crème (Plat)
(7, 24), -- Éclair au chocolat (Dessert)

-- Menu 8
(8, 13), -- Salade niçoise (Entrée)
(8, 16), -- Magret de canard (Plat)
(8, 25), -- Fondant au chocolat (Dessert)

-- Menu 9
(9, 3),  -- Œufs en meurette (Entrée)
(9, 8),  -- Pot-au-feu (Plat)
(9, 26), -- Baba au rhum (Dessert)

-- Menu 10
(10, 5), -- Gougères au Comté (Entrée)
(10, 10),-- Cassoulet (Plat)
(10, 27);-- Crêpes suzette (Dessert)

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
(1, 'REF - 3202606011200001', '2026-01-01 12:00:00', '2026-02-05', '19:30:00', 12, 'boulevard Carnot', 71100, 'Chalon-sur-Saône', 'France', 2, 5.00, 'Validée', 1, 0, 3, 1),
(2, 'REF - 4202606021430152', '2026-02-02 14:30:15', '2026-03-06', '20:00:00', 8, 'rue du Port', 71200, 'Le Creusot', 'France', 4, 10.00, 'En attente', 0, 0, 4, 2),
(3, 'REF - 5202606030915453', '2026-03-03 09:15:45', '2026-04-07', '12:30:00', 25, 'avenue de Verdun', 71300, 'Montceau-les-Mines', 'France', 2, 5.00, 'Livrée', 1, 1, 5, 3),
(4, 'REF - 6202606041645104', '2026-04-04 16:45:10', '2026-05-08', '19:00:00', 3, 'place de l''Hôtel de Ville', 71500, 'Louhans', 'France', 6, 15.00, 'Validée', 1, 0, 6, 4),
(5, 'REF - 7202606051122335', '2026-05-05 11:22:33', '2026-06-09', '20:30:00', 14, 'rue Gambetta', 71600, 'Paray-le-Monial', 'France', 1, 0.00, 'En attente', 0, 0, 7, 5),
(6, 'REF - 8202606061500006', '2026-06-06 15:00:00', '2026-07-10', '19:30:00', 7, 'rue Victor Hugo', 71400, 'Autun', 'France', 2, 5.00, 'Livrée', 0, 0, 8, 6),
(7, 'REF - 9202606071010107', '2026-07-07 10:10:10', '2026-08-11', '12:00:00', 19, 'cours General de Gaulle', 71000, 'Mâcon', 'France', 4, 10.00, 'Validée', 1, 0, 9, 7),
(8, 'REF - 10202606081830008', '2026-08-08 18:30:00', '2026-09-12', '20:00:00', 31, 'rue Pasteur', 71100, 'Chalon-sur-Saône', 'France', 2, 5.00, 'En attente', 0, 0, 10, 8),
(9, 'REF - 11202606090800009', '2026-09-09 08:00:00', '2026-10-13', '19:00:00', 45, 'route de Lyon', 71000, 'Mâcon', 'France', 6, 15.00, 'Validée', 1, 0, 11, 9),
(10, 'REF - 122026061013452010', '2026-10-10 13:45:20', '2026-11-14', '20:30:00', 2, 'rue aux Fèvres', 71100, 'Chalon-sur-Saône', 'France', 2, 5.00, 'Livrée', 0, 0, 12, 10),
(11, 'REF - 13202606111720301', '2026-11-11 17:20:30', '2026-11-15', '19:30:00', 11, 'rue Saint-Jean', 71400, 'Autun', 'France', 1, 0.00, 'En attente', 0, 0, 13, 1),
(12, 'REF - 14202606120950402', '2026-11-12 09:50:40', '2026-11-16', '12:00:00', 6, 'place Saint-Nizier', 71100, 'Chalon-sur-Saône', 'France', 2, 5.00, 'Validée', 1, 0, 14, 2),
(13, 'REF - 15202606131414143', '2026-11-13 14:14:14', '2026-12-17', '20:00:00', 22, 'rue de Paris', 71200, 'Le Creusot', 'France', 4, 10.00, 'Livrée', 1, 1, 15, 3),
(14, 'REF - 16202606141111114', '2026-11-14 11:11:11', '2026-12-18', '19:00:00', 9, 'avenue Jean Jaurès', 71300, 'Montceau-les-Mines', 'France', 2, 5.00, 'Validée', 0, 0, 16, 4),
(15, 'REF - 17202606151625355', '2026-11-15 16:25:35', '2026-12-19', '20:30:00', 18, 'rue de la République', 71500, 'Louhans', 'France', 6, 15.00, 'En attente', 1, 0, 17, 5);

-- Valeur pour avis

INSERT INTO avis (note, description, status, commande_id) VALUES
(5, 'Repas exceptionnel, un vrai délice du terroir ! Les portions étaient généreuses et la livraison ponctuelle.', 'publie', 1),
(4, 'Très bon menu, le bœuf bourguignon était fondant à souhait. Petit bémol sur le dessert un peu trop sucré.', 'publie', 2),
(5, 'Parfait de l''entrée au dessert ! Le service de livraison avec prêt de matériel est un vrai plus.', 'publie', 3),
(3, 'Correct dans l''ensemble, mais la prestation est arrivée un peu en retard par rapport à l''horaire prévu.', 'cree', 4),
(5, 'Une magnifique découverte. Les saveurs étaient au rendez-vous, je recommande vivement.', 'publie', 5),
(2, 'Déçu par la quantité pour le prix demandé, et le plat principal était tiède à l''arrivée.', 'non_valide', 6),
(4, 'Très bonne qualité des produits locaux. Tout le monde s''est régalé lors de notre repas de groupe.', 'publie', 7),
(5, 'Absolument parfait ! Rien à redire, c''était un sans-faute pour notre événement.', 'publie', 8),
(1, 'Catastrophique : erreur dans le menu livré et aucune réponse du service client.', 'non_valide', 9),
(4, 'Très satisfaisant, les saveurs étaient authentiques et bien maîtrisées. À refaire !', 'publie', 10);
