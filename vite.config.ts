import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Reemplaza <TU-REPOSITORIO> con el nombre de tu repositorio en GitHub
const REPO_NAME = '<TU-REPOSITORIO>';

export default defineConfig({
  base: `/${REPO_NAME}/`,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo192.png', 'logo512.png', 'favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Biblioteca ANF',
        short_name: 'BiblioANF',
        description: 'Un repositorio de documentos jurídicos con búsqueda, categorías y un panel de administración.',
        theme_color: '#1e293b',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
