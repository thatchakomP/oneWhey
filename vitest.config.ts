import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        // use happy-dom to avoid native jsdom/webidl issues in some CI/node setups
        environment: 'happy-dom',
        globals: true,
        setupFiles: ['./src/tests/setup.ts'],
        include: ['tests/**/*.spec.tsx'],
    },
})
