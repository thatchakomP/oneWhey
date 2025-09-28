import React from 'react'

export function ResultCard({
    title,
    value,
    unit,
    description,
}: {
    title: string
    value: string
    unit?: string
    description?: string
}) {
    return (
        <div
            className="card space-y-3 animate-fade-in"
            role="region"
            aria-labelledby={`result-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
            <div className="space-y-1">
                <h3
                    id={`result-${title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-medium text-stone-600 uppercase tracking-wide"
                >
                    {title}
                </h3>
                {description && <p className="text-xs text-stone-500">{description}</p>}
            </div>

            <div className="space-y-1">
                <div
                    className="text-3xl font-bold text-stone-900 tabular-nums"
                    aria-label={`${value} ${unit || ''}`}
                >
                    <span className="text-moss">{value}</span>
                    {unit && (
                        <span className="text-lg font-medium text-stone-500 ml-1">{unit}</span>
                    )}
                </div>
            </div>
        </div>
    )
}
