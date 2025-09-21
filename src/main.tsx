import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LocaleApp from './routes/LocaleApp'
import './styles.css'
import './index.css'
import '../public/manifest.webmanifest'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/:locale/*" element={<LocaleApp />} />
                <Route path="/" element={<Navigate to="/en/" replace />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

// optional: listen for beforeinstallprompt to show an install CTA
window.addEventListener('beforeinstallprompt', (e: any) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()(
        // Save the event for later use
        window as any
    ).__deferredInstallPrompt = e
})
