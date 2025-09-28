import React from 'react'
import SiteHeader from '../components/SiteHeader'
import CalculatorCard from '../components/CalculatorCard'

export default function Page() {
    return (
        <div className="min-h-screen bg-bg text-fg">
            <SiteHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <section className="py-8">
                    <div className="mx-auto max-w-5xl">
                        <h1 className="text-3xl font-semibold mb-6">BMR &amp; TDEE Calculator</h1>
                        <CalculatorCard />
                    </div>
                </section>
            </main>
        </div>
    )
}
