# Utiliser une image Node.js officielle
FROM node:20

# Définir le répertoire de travail sur /app
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port du back-end (ajuste si nécessaire, 3000 par défaut)
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["npm", "run", "build"]