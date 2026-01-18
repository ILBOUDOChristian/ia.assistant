import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/brandbrain-ai/', // Remplacez par le nom EXACT de votre dépôt sur GitHub
})
