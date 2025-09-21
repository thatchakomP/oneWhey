import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import CalculatorPage from './[locale]/index'
import enMessages from '../i18n/messages/en.json'
import thMessages from '../i18n/messages/th.json'
import { IntlProvider } from 'react-intl'

export default function LocaleApp() {
    const { locale } = useParams()
    const messages = locale === 'th' ? thMessages : enMessages

    return (
        <IntlProvider locale={locale || 'en'} messages={messages} defaultLocale="en">
            <Routes>
                <Route path="/" element={<CalculatorPage />} />
            </Routes>
        </IntlProvider>
    )
}
