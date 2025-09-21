import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icons/*'],
            manifest: {
                short_name: 'oneWhey',
                name: 'oneWhey — BMR/TDEE Calculator',
                icons: [
                    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
                    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
                ],
                start_url: '/en/',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#111827',
            },
        }),
    ],
})
