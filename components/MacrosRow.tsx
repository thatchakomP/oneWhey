import React from 'react'

export function MacrosRow({
    protein,
    carbs,
    fat,
}: {
    protein: string
    carbs: string
    fat: string
}) {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm grid grid-cols-3 gap-3 border border-gray-100">
            <div className="text-center">
                <div className="text-xs text-stone-500">Protein</div>
                <div className="mt-1 font-medium text-[var(--text)]">{protein} g</div>
            </div>
            <div className="text-center">
                <div className="text-xs text-stone-500">Carbs</div>
                <div className="mt-1 font-medium text-[var(--text)]">{carbs} g</div>
            </div>
            <div className="text-center">
                <div className="text-xs text-stone-500">Fat</div>
                <div className="mt-1 font-medium text-[var(--text)]">{fat} g</div>
            </div>
        </div>
    )
}
