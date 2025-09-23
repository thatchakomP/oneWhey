import React from 'react'

export function ResultCard({
    title,
    value,
    unit,
}: {
    title: string
    value: string
    unit?: string
}) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-card border border-gray-100">
            <div className="text-sm text-stone-500">{title}</div>
            <div className="mt-2 text-3xl font-semibold text-[var(--text)]">
                {value} {unit}
            </div>
        </div>
    )
}
