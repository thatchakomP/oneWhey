module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: {
                    DEFAULT: '#FFFFFF',
                    panel: '#F7F7F7',
                },
                text: {
                    DEFAULT: '#111827',
                    muted: '#6B7280',
                },
                stroke: '#E5E7EB',
                accent: {
                    dustyBlue: '#5A7FA5',
                    sage: '#8AA899',
                },
                semantic: {
                    success: '#0EA5E9',
                    warning: '#F59E0B',
                    danger: '#EF4444',
                },
            },
            fontFamily: {
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                ],
            },
            spacing: {
                1: '0.25rem',
                2: '0.5rem',
                3: '0.75rem',
                4: '1rem',
                6: '1.5rem',
                8: '2rem',
                12: '3rem',
                16: '4rem',
                24: '6rem',
                32: '8rem',
                48: '12rem',
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1.5rem',
                    md: '2.5rem',
                },
                screens: {
                    DEFAULT: '720px',
                    lg: '960px',
                },
            },
            boxShadow: {
                card: '0 2px 8px rgba(17,24,39,0.04)',
            },
            keyframes: {
                'scandi-fade': {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'scandi-fade': 'scandi-fade 180ms ease-out both',
            },
            transitionDuration: {
                150: '150ms',
                200: '200ms',
            },
        },
        screens: {
            sm: '480px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
    },
    plugins: [],
}
