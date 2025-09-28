module.exports = {
    content: [
        './app/**/*.{ts,tsx,js,jsx}',
        './app/**/*.css',
        './components/**/*.{ts,tsx,js,jsx,css}',
        './src/**/*.{ts,tsx,js,jsx,css}',
    ],
    theme: {
        screens: {
            xs: '320px',
            sm: '420px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
            '3xl': '1920px',
        },
        extend: {
            colors: {
                alabaster: '#fcfff8',
                pebble: '#d5d0c8',
                driftwood: '#b8ad9d',
                bark: '#967f6c',
                timber: '#674e3c',
                shadow: '#241c17',
            },
            spacing: {
                7.5: '1.875rem',
            },
        },
    },
    plugins: [],
}
