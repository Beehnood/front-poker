import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173', // URL de ton application
        specPattern: 'cypress/e2e/**/*.{js,ts}', // Chemin des fichiers de test
        supportFile: false, // Désactive si tu n'as pas de fichier de support
    },
});