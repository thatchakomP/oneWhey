import React from 'react'
import SiteHeader from '../components/SiteHeader'
import HeroBmr from '../components/HeroBmr'
import { BmrForm } from '../components/BmrForm'
import { ResultCard } from '../components/ResultCard'
import { MacrosRow } from '../components/MacrosRow'
import { computeAll, InputPayload } from '../src/lib/calc'
import { useState, useRef } from 'react'

export default function Page() {
    const [result, setResult] = useState(() =>
        computeAll({
            sex: 'male',
            age: 30,
            height: 170,
            weight: 70,
            activity: 'moderate',
        } as InputPayload)
    )

    const resultsRef = useRef<HTMLDivElement | null>(null)

    function handleChange(values: any) {
        try {
            const payload = { ...values } as InputPayload
            const computed = computeAll(payload)
            setResult(computed)
        } catch (e) {
            // ignore
        }
    }

    function handleCalculate(values: any) {
        // compute and then move focus to results for screen reader users
        try {
            const payload = { ...values } as InputPayload
            const computed = computeAll(payload)
            setResult(computed)
            // focus the results container so SR announces the updated aria-live content
            resultsRef.current?.focus()
        } catch (e) {
            // ignore
        }
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            <SiteHeader />
            <main className="max-w-7xl mx-auto px-6 py-12">
                <HeroBmr />
                <div className="mt-10 grid grid-cols-12 gap-8 items-start">
                    <div className="col-span-12 lg:col-span-5">
                        <BmrForm onChange={handleChange} onCalculate={handleCalculate} />
                    </div>
                    <div className="col-span-12 lg:col-span-7">
                        <div className="sticky top-24 space-y-4">
                            <div
                                ref={resultsRef}
                                tabIndex={-1}
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                <ResultCard title="BMR" value={String(result.bmr)} unit="kcal" />
                                <ResultCard title="TDEE" value={String(result.tdee)} unit="kcal" />
                                <MacrosRow
                                    protein={String(result.macros.protein)}
                                    carbs={String(result.macros.carbs)}
                                    fat={String(result.macros.fat)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
