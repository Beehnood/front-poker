Poker Front-End Application
Description du Projet
Ce projet est une application front-end pour un jeu de poker Texas Hold'em, développée dans le cadre d'un exercice pour compléter une 
API Poker précédemment implémentée. Le front-end est construit avec React.ts et Vite, et communique avec une API back-end en Nest.js via des requêtes AJAX. 
L'application est conteneurisée avec Docker et orchestrée via Docker Compose pour faciliter le déploiement. Le projet est versionné sur Git et déployé sur un serveur en ligne.

L'application permet aux utilisateurs de :
Créer un compte
Se connecter et se déconnecter
Afficher leur profil (pseudo et solde)
Rejoindre une table de poker
Lancer une partie
Jouer un premier tour de Texas Hold'em
Le projet a été réalisé par une équipe de deux personnes : MBAYE et AMADOU Singuila. MBAYE s'est concentré sur la configuration de Docker et l'initialisation du projet, 
tandis qu'AMADOU Singuila a travaillé sur la maquette de l'application web. Le développement du front-end est réalisé conjointement par les deux membres.

Fonctionnalités
Gestion des comptes utilisateurs :
Inscription d'un nouveau compte
Connexion et déconnexion sécurisées
Affichage du profil utilisateur avec pseudo et solde
Fonctionnalités de jeu :
Rejoindre une table de poker
Démarrer une partie de Texas Hold'em
Jouer le premier tour
Tests :
Sept tests unitaires sont effectués,
Trois tests end-to-end (E2E) sont effectués
tous les resultats des tests sont succés

Environnement conteneurisé :
Front-end, back-end et base de données MongoDB dans des conteneurs Docker distincts
Configuré avec Docker Compose pour un déploiement simplifié

Sécurité :
Respect des bonnes pratiques pour la communication API et l'authentification

Accessibilité :
Conception respectant les normes d'accessibilité pour une expérience inclusive
Pile Technologique
Front-End : React.ts, Vite
Back-End : Nest.js (API Poker)
Base de Données : MongoDB
Conteneurisation : Docker, Docker Compose
Contrôle de Version : Git
Tests : Jest (tests unitaires), Cypress (tests E2E)
Installation et Configuration
Suivez ces étapes pour configurer et exécuter le projet localement.

Prérequis
Docker et Docker Compose installés
Git installé
Node.js (pour le développement local hors Docker, facultatif)
Une interface en ligne de commande
Étapes
Cloner le Dépôt :
git clone <url-du-dépôt>
cd poker-project
Configurer les Variables d'Environnement :
Créez un fichier .env dans le répertoire racine à partir de .env.example.
Configurez les variables suivantes :
env

APP_PORT=80
VITE_PORT=5173
MONGODB_URI=...
WWWUSER=1000
WWWGROUP=1000

Construire et Lancer avec Docker Compose :
docker-compose up --build
Cela construit et lance les conteneurs suivants :
front-poker-api : Application front-end React
back-poker-api : API back-end Nest.js
poker-database : Base de données MongoDB
Accéder à l'Application :
Front-end : http://localhost:${APP_PORT:-80}
Vite dev server (si nécessaire) : http://localhost:${VITE_PORT:-5173}
MongoDB : Connectez-vous via l'URI spécifiée dans .env
Exécuter les Tests :

Tests Unitaires (dans le dossier front) :
cd front
npm install
npm test

Tests E2E (avec Cypress) :
Commande	                     Description
npx cypress open	             Ouvre l'interface graphique (Test Runner)
npx cypress run	               Exécute les tests en mode headless (terminal)
npx cypress run --browser      chrome	Lance les tests dans Chrome
npx cypress run --headed	     Exécute en mode visible (non headless)
npx cypress run --spec         "cypress/e2e/login.spec.js"	Exécute un fichier de test spécifique
npx cypress run --record --key <your-key>	Enregistre les résultats sur le Dashboard Cypress
npx cypress info	             Affiche les infos d'installation

Arrêter l'Application :
docker-compose down
Structure du Projet
plaintext

Copy
App-Web/
├── front-poker-api/                    # Application front-end React.ts
│   ├── src/                  # Code source
│   ├── Dockerfile            # Dockerfile pour le front-end
│   ├── vite.config.ts        # Configuration Vite
│   └── package.json          # Dépendances front-end
├── back-poker-api/                      # API back-end Nest.js
│   ├── src/                  # Code source
│   ├── Dockerfile            # Dockerfile pour le back-end
│   └── package.json          # Dépendances back-end
├── docker-compose.yml        # Configuration Docker Compose
├── .env.example              # Exemple de variables d'environnement
└── README.md                 # Documentation du projet
Configuration Docker Compose
Le fichier docker-compose.yml définit trois services :

poker-front : Exécute le front-end React, exposé sur le port ${APP_PORT:-80} et le serveur Vite sur ${VITE_PORT:-5173}.
poker-api : Exécute l'API Nest.js.
poker-database : Exécute MongoDB, connecté via l'URI MongoDB.
Les volumes sont utilisés pour monter le code source et faciliter le développement.

Contributions de l'Équipe
MBAYE :
Configuration de Docker et Docker Compose
Initialisation de la structure du projet
Implémentation des tests unitaires et E2E
Développement conjoint du front-end

AMADOU Singuila :
Conception de la maquette de l'application web
Implémentation des tests unitaires et E2E
Développement conjoint du front-end

