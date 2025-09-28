import type { Config } from 'tailwindcss'

export default {
    // use classic 'class' dark mode strategy (string) to satisfy typing
    darkMode: 'class',
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            // Raw swatches for direct use when needed
            colors: {
                alabaster: '#fcfff8',
                pebble: '#d5d0c8',
                driftwood: '#b8ad9d',
                bark: '#967f6c',
                timber: '#674e3c',
                shadow: '#241c17',

                // Semantic tokens mapped to CSS variables
                bg: {
                    DEFAULT: 'var(--bg)',
                    subtle: 'var(--bg-subtle)',
                    raised: 'var(--bg-raised)',
                },
                fg: {
                    DEFAULT: 'var(--fg)',
                    muted: 'var(--fg-muted)',
                    subtle: 'var(--fg-subtle)',
                    onBrand: 'var(--fg-onBrand)',
                },
                brand: {
                    DEFAULT: 'var(--brand)',
                    hover: 'var(--brand-hover)',
                    ring: 'var(--brand-ring)',
                    soft: 'var(--brand-soft)',
                },
                stroke: { DEFAULT: 'var(--stroke)', strong: 'var(--stroke-strong)' },
            },

            boxShadow: {
                card: '0 1px 2px rgba(36,28,23,.05), 0 8px 24px rgba(36,28,23,.06)',
                focus: '0 0 0 4px var(--brand-ring)',
            },

            borderRadius: { xl: '1rem', '2xl': '1.25rem' },
        },
    },
    plugins: [],
} satisfies Config
