# Vite et Gourmand 🍔

Bienvenue sur le dépôt officiel du projet **Vite et Gourmand**. Cette application web est constituée d'un backend en PHP/MySQL (architecturé en MVC) et d'un frontend moderne propulsé par React et Vite.

## 🛠️ Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine locale :

* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/)
* [Node.js](https://nodejs.org/) (nécessaire pour lancer le frontend)
* [Composer](https://getcomposer.org/) (optionnel, géré principalement via Docker)

## 📁 Structure du Projet

```text
.
├── docker-compose.yml
├── backend/
│   ├── config/
│   ├── Controller/
│   ├── Database/
│   ├── Entity/
│   ├── Public/
│   ├── Repository/
│   ├── Service/
│   └── composer.json
└── frontend/
    ├── public/
    ├── src/
    ├── package.json
    └── vite.config.js
```

## 🚀 Installation et Lancement Local

Suivez ces étapes pour installer et lancer le projet en local :

### 1. Cloner le projet

Clonez le dépôt distant sur votre machine locale, puis rendez-vous dans le dossier créé :

```bash
git clone https://github.com/Alerwann/viteetgourmand
cd viteetgourmand
```

Si nécessaire, créez un fichier `.env` à la racine pour configurer vos variables d'environnement (identifiants de base de données, ports, etc.).

### 2. Lancer les conteneurs Docker

Exécutez la commande suivante pour construire et démarrer les conteneurs en arrière-plan :

```bash
docker compose up -d --build
```

*Vérification :* Vous pouvez vérifier que les conteneurs tournent correctement avec la commande :

```bash
docker compose ps
```

### 3. Base de données

Les scripts SQL se trouvent déjà dans le dossier `backend/Database/` de votre dépôt. Selon la configuration de votre `docker-compose.yml`, ils peuvent être initialisés automatiquement au premier lancement du conteneur de base de données. Si besoin, vous pouvez également les importer manuellement.

### 4. Installer les dépendances du Backend

Exécutez l'installation des dépendances PHP (Composer) à l'intérieur du conteneur backend :

```bash
docker compose exec backend composer install
```

### 5. Installer les dépendances et lancer le Frontend

Rendez-vous dans le dossier du frontend, installez les modules Node.js puis lancez le serveur de développement Vite :

```bash
cd frontend
npm install
npm run dev
```

Le serveur de développement Vite s'ouvrira généralement sur l'adresse : `http://localhost:5173`.

## 🔍 Dépannage rapide

* **Erreur de connexion MySQL :** Assurez-vous que les variables d'environnement de connexion dans le backend correspondent aux identifiants définis dans votre `docker-compose.yml`.
* **Ports occupés :** Vérifiez qu'aucun autre service local (comme un autre serveur MySQL ou Apache) n'utilise déjà les ports par défaut de Docker (ex: `3306`, `80`, etc.).