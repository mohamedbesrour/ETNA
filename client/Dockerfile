# Utilisez l'image officielle node comme base
FROM node:16

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances nécessaires
RUN npm install

# Copiez tous les fichiers du répertoire actuel (à l'exception de ceux listés dans .dockerignore) dans le répertoire de travail dans le conteneur
COPY . .

# Construisez l'application React pour la production
RUN npm run build

# Exposez le port 3000 pour que l'application soit accessible
EXPOSE 3000

# Commande par défaut pour démarrer l'application quand le conteneur est lancé
CMD ["npm", "start"]
