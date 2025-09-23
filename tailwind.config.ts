import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{ts,tsx,js,jsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                moss: '#2F4C3A',
                clay: '#CF6B4F',
                sage: '#8AA388',
                stone: {
                    900: '#111827',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Fraunces', 'Georgia', 'serif'],
            },
            borderRadius: {
                'xl-2': '1rem',
                pill: '9999px',
            },
            boxShadow: {
                card: '0 6px 18px rgba(16,24,40,0.06)',
                panel: '0 10px 30px rgba(16,24,40,0.08)',
            },
        },
    },
    plugins: [
        function (api: any) {
            const { addComponents, addUtilities, theme } = api
            addComponents({
                '.scandi-input': {
                    borderRadius: theme('borderRadius.xl'),
                    borderWidth: '1px',
                    borderColor: theme('colors.gray.300'),
                    paddingTop: theme('spacing.3'),
                    paddingBottom: theme('spacing.2'),
                    paddingLeft: theme('spacing.3'),
                    paddingRight: theme('spacing.3'),
                    backgroundColor: theme('colors.white'),
                },
                '.pill': {
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '44px',
                    paddingLeft: theme('spacing.3'),
                    paddingRight: theme('spacing.3'),
                    borderRadius: theme('borderRadius.pill'),
                    borderWidth: '1px',
                    borderColor: theme('colors.gray.200'),
                    backgroundColor: theme('colors.white'),
                    fontWeight: theme('fontWeight.medium'),
                },
            })

            addUtilities({
                '.pill-selected': {
                    backgroundColor: theme('colors.moss'),
                    color: theme('colors.white'),
                    borderColor: 'transparent',
                },
            })
        },
    ],
}

export default config
