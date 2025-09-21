'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LangSwitcher() {
    const pathname = usePathname() ?? '/en'
    // remove existing locale prefix if present
    const rest = pathname.replace(/^\/(en|th)/, '') || '/'
    const toEN = `/en${rest}`
    const toTH = `/th${rest}`

    return (
        <nav aria-label="Language switcher">
            <Link href={toEN} className="mr-2" locale={false}>
                EN
            </Link>
            <Link href={toTH} locale={false}>
                TH
            </Link>
        </nav>
    )
}
