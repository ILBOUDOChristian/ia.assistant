import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/ia.assistant/', // Doit correspondre exactement au nom de votre dépôt GitHub
})
