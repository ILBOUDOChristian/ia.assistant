import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './', // Utilise des chemins relatifs pour éviter les problèmes de sous-dossiers GitHub
    build: {
        // Désactive les source maps pour cacher le code source original
        sourcemap: false,
        // Minification avancée
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Supprime les console.log en production
                drop_debugger: true
            },
            mangle: {
                // Rend les noms de variables illisibles
                toplevel: true
            },
            format: {
                comments: false // Supprime tous les commentaires
            }
        },
        // Divise le code en plusieurs fichiers pour compliquer la lecture
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['react', 'react-dom'],
                }
            }
        }
    }
})
