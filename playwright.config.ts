import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: 'tests',
    timeout: 30_000,
    use: {
        baseURL: 'http://localhost:5173',
        headless: true,
        viewport: { width: 1280, height: 800 },
    },
})
