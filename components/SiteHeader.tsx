import React from 'react'

export default function SiteHeader() {
    return (
        <header
            role="banner"
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-stone-200"
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-moss to-sage flex items-center justify-center shadow-sm"
                            role="img"
                            aria-label="oneWhey logo"
                        >
                            <span className="text-white font-bold text-sm">1W</span>
                        </div>
                        <div className="space-y-0.5">
                            <div className="text-base font-semibold text-stone-900">oneWhey</div>
                            <div className="text-xs text-stone-500 leading-none">
                                Health Calculator
                            </div>
                        </div>
                    </div>

                    {/* Main Title - Hidden on mobile, shown on tablet+ */}
                    <h1 className="hidden md:block text-xl font-serif font-bold text-stone-900">
                        BMR & TDEE Calculator
                    </h1>

                    {/* Navigation Actions */}
                    <div className="flex items-center gap-3">
                        {/* Settings/Menu button - placeholder for future features */}
                        <button
                            className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-50 focus-visible transition-colors"
                            aria-label="Settings and options"
                            type="button"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </button>

                        {/* Language Switcher placeholder */}
                        <div className="text-sm text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg">
                            EN
                        </div>
                    </div>
                </div>

                {/* Mobile title - shown only on mobile */}
                <div className="md:hidden mt-2 pt-2 border-t border-stone-100">
                    <h1 className="text-lg font-serif font-bold text-stone-900 text-center">
                        BMR & TDEE Calculator
                    </h1>
                </div>
            </div>
        </header>
    )
}
