import React from 'react'

export default function SiteHeader() {
    return (
        <header className="py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-moss" />
                    <div className="text-sm font-medium">oneWhey</div>
                </div>
                <div className="text-lg font-serif font-bold">BMR & TDEE Calculator</div>
                <div className="flex items-center gap-3">⚙️</div>
            </div>
        </header>
    )
}
