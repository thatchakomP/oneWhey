module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        screens: {
            // Custom breakpoints requested by user
            xs: { min: '320px', max: '480px' }, // Extra Small Mobile (Portrait)
            sm: { min: '481px', max: '600px' }, // Small Mobile (Landscape)
            st: { min: '601px', max: '768px' }, // Small Tablets (Portrait)
            lt: { min: '769px', max: '1024px' }, // Large Tablets (Landscape)
            sd: { min: '1025px', max: '1280px' }, // Small Desktops and Laptops
            ld: { min: '1281px', max: '1440px' }, // Large Desktops and High-Res
            xl: { min: '1441px' }, // Extra-Large Desktops
        },
    },
    plugins: [],
}
