'use client'

import { useEffect, useState } from 'react'

export default function PwaRegister() {
    const [updateAvailable, setUpdateAvailable] = useState(false)
    const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return
        if (!('serviceWorker' in navigator)) return
        // Allow enabling SW in development for testing via NEXT_PUBLIC_ENABLE_SW=true
        if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_ENABLE_SW !== 'true')
            return

        let registration: ServiceWorkerRegistration | null = null

        const onControllerChange = () => {
            // When the new service worker takes control, reload to use the new content
            window.location.reload()
        }

        const registerSW = async () => {
            try {
                const swPath =
                    process.env.NODE_ENV === 'production'
                        ? '/sw.js'
                        : process.env.NEXT_PUBLIC_ENABLE_SW === 'true'
                        ? '/sw.dev.js'
                        : '/sw.js'
                registration = await navigator.serviceWorker.register(swPath)

                // If there's a waiting worker already, signal that an update is available
                if (registration.waiting) {
                    setWaitingWorker(registration.waiting)
                    setUpdateAvailable(true)
                }

                // New updates will trigger updatefound
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration?.installing
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (
                                newWorker.state === 'installed' &&
                                navigator.serviceWorker.controller
                            ) {
                                // A new worker is installed and there's an existing controller -> update available
                                setWaitingWorker(newWorker)
                                setUpdateAvailable(true)
                            }
                        })
                    }
                })

                // Listen for controllerchange so we can reload when the new worker activates
                navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)
            } catch (err) {
                console.debug('SW registration failed', err)
            }
        }

        registerSW()

        return () => {
            try {
                navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange)
            } catch (e) {
                // ignore
            }
        }
    }, [])

    const applyUpdate = () => {
        try {
            // Tell the waiting worker to skip waiting, it will then activate
            waitingWorker?.postMessage({ type: 'SKIP_WAITING' })
        } catch (e) {
            console.debug('Failed to postMessage to waiting worker', e)
        }
    }

    const dismiss = () => {
        // animate out then hide
        setHidden(true)
        setTimeout(() => setUpdateAvailable(false), 220)
    }

    if (!updateAvailable) return null

    return (
        <div role="status" aria-live="polite" className={`pwa-toast ${hidden ? 'hide' : ''}`}>
            <div className="pwa-message">A new version is available.</div>
            <div className="pwa-actions">
                <button
                    className="pwa-btn"
                    onClick={dismiss}
                    aria-label="Dismiss update notification"
                >
                    Dismiss
                </button>
                <button
                    className="pwa-btn primary"
                    onClick={applyUpdate}
                    aria-label="Update to new version"
                >
                    Update
                </button>
            </div>
        </div>
    )
}
