import pwa from 'next-pwa'

const isProd = process.env.NODE_ENV === 'production'

const runtimeCaching = [
    {
        // Cache common static image assets
        urlPattern: '/_next/image',
        handler: 'CacheFirst',
        options: {
            cacheName: 'images-cache',
            expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
            cacheableResponse: { statuses: [0, 200] },
        },
    },
    {
        // Static JS/CSS under _next/static
        urlPattern: '/_next/static/',
        handler: 'StaleWhileRevalidate',
        options: { cacheName: 'static-resources', expiration: { maxEntries: 60 } },
    },
    {
        // Google fonts
        urlPattern: 'https://fonts.googleapis.com/',
        handler: 'CacheFirst',
        options: {
            cacheName: 'google-fonts',
            expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
    },
    {
        // API calls
        urlPattern: '/api/',
        handler: 'NetworkFirst',
        options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 10,
            expiration: { maxEntries: 50 },
        },
    },
]

const baseConfig = {
    reactStrictMode: true,
}

// next-pwa expects to be called with options and returns a config wrapper:
const withPWA = pwa({
    dest: 'public',
    disable: !isProd,
    register: true,
    skipWaiting: true,
    sw: 'sw.js',
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
})

const nextConfig = withPWA({
    ...baseConfig,
})

export default nextConfig
