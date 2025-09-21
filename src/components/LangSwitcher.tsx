import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function LangSwitcher() {
    const navigate = useNavigate()
    const { locale } = useParams()

    function switchTo(l: string) {
        navigate(`/${l}/`)
    }

    return (
        <div>
            <button onClick={() => switchTo('en')} disabled={locale === 'en'}>
                EN
            </button>
            <button onClick={() => switchTo('th')} disabled={locale === 'th'}>
                TH
            </button>
        </div>
    )
}
