import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import '../globals.css'

export const metadata = {
    title: 'oneWhey — BMR/TDEE Calculator',
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    const locale = params.locale ?? 'en'
    let messages: Record<string, string>
    try {
        messages = (await import(`../../i18n/messages/${locale}.json`)).default
    } catch (e) {
        messages = (await import('../../i18n/messages/en.json')).default
    }

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <main className="mx-auto max-w-2xl p-4">{children}</main>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
