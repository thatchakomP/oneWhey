import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import PwaRegister from './(shared)/PwaRegister'

export const metadata: Metadata = {
    title: 'oneWhey — BMR & TDEE Calculator',
    description: 'Calculate BMR, TDEE and daily macros',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-alabaster text-shadow min-h-screen">
                <header className="container-centered p-4">
                    <Link href="/en" className="text-driftwood font-semibold">
                        oneWhey
                    </Link>
                </header>
                <main className="container-centered p-4">{children}</main>
                <PwaRegister />
            </body>
        </html>
    )
}
