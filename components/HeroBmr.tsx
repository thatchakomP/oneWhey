import React from 'react'

export default function HeroBmr() {
    return (
        <section className="relative">
            <div className="relative overflow-hidden rounded-2xl">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(90deg,#CF6B4F 0%,#CF6B4F 40%,#8AA388 40%,#8AA388 100%), radial-gradient(80% 120% at 100% 0%, rgba(0,0,0,.18) 0%, rgba(0,0,0,0) 55%), linear-gradient(0deg,#F7F4EF 0%,#F7F4EF 22%, rgba(0,0,0,0) 22%)`,
                        backgroundBlendMode: 'normal, multiply, normal',
                    }}
                />
                <div
                    className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none"
                    style={{
                        backgroundImage:
                            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGBgAAAABQAB9D2JqQAAAABJRU5ErkJggg==")',
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-6 py-14 lg:py-20">
                    <h1 className="font-serif text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)]">
                        BMR & TDEE Calculator
                    </h1>
                    <p className="mt-3 max-w-xl text-stone-800">
                        Accurate, simple, and science-backed estimates for your daily energy needs.
                    </p>
                </div>
            </div>
        </section>
    )
}
