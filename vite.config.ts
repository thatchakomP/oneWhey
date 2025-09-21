import { defineConfig } from 'vite'

// Minimal Vite config. We avoid importing @vitejs/plugin-react here to prevent
// ESM/CJS resolution issues when test runners load the config. The dev
// environment (vite dev) can still add the plugin locally if needed.
export default defineConfig({})
