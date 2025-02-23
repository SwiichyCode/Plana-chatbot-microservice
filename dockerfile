# 1. Utiliser l’image officielle Node.js (version optimisée)
FROM node:18-alpine

# 2. Définir le répertoire de travail
WORKDIR /app

# 3. Copier les fichiers package.json et package-lock.json avant l’installation des dépendances
COPY package*.json ./

# 4. Installer les dépendances (sans cache pour accélérer le build)
RUN npm install
RUN npm install -g typescript

# 5. Copier le reste des fichiers dans le container
COPY . .

# 6. Transpiler le TypeScript vers JavaScript
RUN npm run build

# 7. Exposer le port
EXPOSE 4000

# 8. Lancer l'application avec Node.js depuis le dossier `build/`
CMD ["node", "dist/server.js", "dist/workers/index.js"]