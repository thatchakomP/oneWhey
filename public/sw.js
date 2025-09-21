const CACHE_NAME = 'onewhey-v1'
const ASSETS = [
    '/',
    '/index.html',
    '/src/main.tsx',
    '/src/styles.css',
    '/public/manifest.webmanifest',
]

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)))
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) => Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k))))
    )
    self.clients.claim()
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(
            (r) =>
                r ||
                fetch(event.request).then((res) => {
                    // Optionally cache dynamic requests here
                    return res
                })
        )
    )
})
