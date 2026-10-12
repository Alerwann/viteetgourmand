SET NAMES 'utf8mb4';

SOURCE /docker-entrypoint-initdb.d/database/tables/horaire.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/role.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/regime.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/theme.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/alergene.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/utilisateur.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/plat.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/plat_alergene.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/menu.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/commande.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/avis.sql;
SOURCE /docker-entrypoint-initdb.d/database/tables/contact_request.sql;