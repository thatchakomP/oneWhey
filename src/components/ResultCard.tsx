import React from 'react'
import { useIntl } from 'react-intl'

type Goals = {
    cut20: number
    cut10: number
    maintain: number
    bulk10: number
    bulk20: number
}

type Props = {
    bmr: number
    tdee: number
    goals: Goals
    macros?: {
        protein: number
        fat: number
        carbs: number
    }
}

export default function ResultCard({ bmr, tdee, goals, macros }: Props) {
    const intl = useIntl()
    const last = (id: string) => {
        const parts = id.split('.')
        return parts[parts.length - 1] ?? id
    }

    return (
        <section aria-label="results" className="scandi-card p-4">
            <header className="mb-3">
                <h2 className="text-3xl font-semibold">{last('results.title')}</h2>
                <p className="text-sm text-muted">{last('results.subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 gap-3">
                <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted">{last('label.bmr')}</span>
                    <span className="text-3xl font-semibold">{bmr} kcal</span>
                </div>

                <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted">{last('label.tdee')}</span>
                    <span className="text-3xl font-semibold">{tdee} kcal</span>
                </div>

                <div className="pt-3 border-t" style={{ borderColor: 'var(--stroke)' }}>
                    <div className="text-sm text-muted">{last('label.goals')}</div>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                        <div className="p-3 bg-panel rounded">
                            <div className="text-sm text-muted">{last('goal.cut20')}</div>
                            <div className="font-semibold">{goals.cut20} kcal</div>
                        </div>
                        <div className="p-3 bg-panel rounded">
                            <div className="text-sm text-muted">{last('goal.maintain')}</div>
                            <div className="font-semibold">{goals.maintain} kcal</div>
                        </div>
                        <div className="p-3 bg-panel rounded">
                            <div className="text-sm text-muted">{last('goal.bulk10')}</div>
                            <div className="font-semibold">{goals.bulk10} kcal</div>
                        </div>
                        <div className="p-3 bg-panel rounded">
                            <div className="text-sm text-muted">{last('goal.bulk20')}</div>
                            <div className="font-semibold">{goals.bulk20} kcal</div>
                        </div>
                    </div>
                </div>
                {macros && (
                    <div className="pt-3 border-t" style={{ borderColor: 'var(--stroke)' }}>
                        <div className="text-sm text-muted">{last('macros.title')}</div>
                        <div className="mt-2 grid grid-cols-3 gap-3">
                            <div className="p-3 bg-panel rounded text-center">
                                <div className="text-sm text-muted">{last('macros.protein')}</div>
                                <div className="font-semibold">{macros.protein} g</div>
                            </div>
                            <div className="p-3 bg-panel rounded text-center">
                                <div className="text-sm text-muted">{last('macros.fat')}</div>
                                <div className="font-semibold">{macros.fat} g</div>
                            </div>
                            <div className="p-3 bg-panel rounded text-center">
                                <div className="text-sm text-muted">{last('macros.carbs')}</div>
                                <div className="font-semibold">{macros.carbs} g</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
