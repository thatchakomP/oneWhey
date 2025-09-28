import './globals.css'

export const metadata = {
    title: 'oneWhey — Calculator',
    description: 'BMR & TDEE calculator example',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
