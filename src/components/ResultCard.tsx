import React from 'react'

type Props = {
    bmr: number
    tdee: number
    proteinG: number
    carbsG: number
    fatG: number
}

export default function ResultCard({ bmr, tdee, proteinG, carbsG, fatG }: Props) {
    return (
        <div className="card mt-6" role="status" aria-live="polite">
            <h3 className="text-lg font-semibold text-shadow">Results</h3>
            <dl className="mt-3 grid grid-cols-1 gap-2">
                <div className="flex justify-between">
                    <dt className="text-sm muted-text">BMR</dt>
                    <dd className="font-medium">{bmr} kcal</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-sm muted-text">TDEE</dt>
                    <dd className="font-medium">{tdee} kcal</dd>
                </div>
                <div className="flex justify-between pt-2 border-t border-pebble/50">
                    <dt className="text-sm muted-text">Protein</dt>
                    <dd className="font-medium">{proteinG} g</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-sm muted-text">Carbs</dt>
                    <dd className="font-medium">{carbsG} g</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-sm muted-text">Fat</dt>
                    <dd className="font-medium">{fatG} g</dd>
                </div>
            </dl>
        </div>
    )
}
