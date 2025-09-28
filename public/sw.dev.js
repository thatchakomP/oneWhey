// Dev-safe service worker for local testing. This file intentionally avoids
// precaching production build assets to prevent 404s in the dev server.

self.addEventListener('install', (event) => {
    // Activate immediately
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    // Take control immediately
    event.waitUntil(self.clients.claim())
})

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})

// Simple network-first fetch handler for local testing
self.addEventListener('fetch', (event) => {
    // Pass-through for everything; dev SW should not interfere with dev assets
    return
})
