'use client'
import { useEffect, useMemo, useState } from 'react'

type Sex = 'male' | 'female'
type Activity = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'

const MULTIPLIER: Record<Activity, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    extra: 1.9,
}

const prettyActivity: Record<Activity, string> = {
    sedentary: 'Sedentary (1.2)',
    light: 'Lightly active (1.375)',
    moderate: 'Moderately active (1.55)',
    very: 'Very active (1.725)',
    extra: 'Extra active (1.9)',
}

const KEY = 'bmr_tdee_form_v1'

export default function CalculatorCard() {
    const [sex, setSex] = useState<Sex>('male')
    const [age, setAge] = useState<number | ''>(30)
    const [height, setHeight] = useState<number | ''>(170)
    const [weight, setWeight] = useState<number | ''>(65)
    const [activity, setActivity] = useState<Activity>('sedentary')

    // load persisted
    useEffect(() => {
        if (typeof window === 'undefined') return
        const raw = localStorage.getItem(KEY)
        if (raw) {
            try {
                const v = JSON.parse(raw)
                setSex(v.sex ?? 'male')
                setAge(v.age ?? 30)
                setHeight(v.height ?? 170)
                setWeight(v.weight ?? 65)
                setActivity(v.activity ?? 'sedentary')
            } catch {}
        }
    }, [])

    // persist (debounced write)
    useEffect(() => {
        if (typeof window === 'undefined') return
        const t = setTimeout(() => {
            localStorage.setItem(KEY, JSON.stringify({ sex, age, height, weight, activity }))
        }, 250)
        return () => clearTimeout(t)
    }, [sex, age, height, weight, activity])

    const valid =
        typeof age === 'number' &&
        age >= 10 &&
        age <= 100 &&
        typeof height === 'number' &&
        height >= 90 &&
        height <= 250 &&
        typeof weight === 'number' &&
        weight >= 25 &&
        weight <= 300

    // Mifflin–St Jeor
    const bmr = useMemo(() => {
        if (!valid) return null
        const base = 10 * (weight as number) + 6.25 * (height as number) - 5 * (age as number)
        return Math.round(sex === 'male' ? base + 5 : base - 161)
    }, [age, height, weight, sex, valid])

    const tdee = useMemo(
        () => (bmr ? Math.round(bmr * MULTIPLIER[activity]) : null),
        [bmr, activity]
    )

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Form */}
            <section className="card bg-bg-raised border border-stroke rounded-2xl shadow-card p-6">
                <h2 className="text-lg font-medium mb-4">Your details</h2>

                {/* Sex segmented */}
                <div className="mb-4">
                    <label className="text-sm font-medium">Sex</label>
                    <div
                        className="mt-2 inline-flex overflow-hidden rounded-xl border border-stroke"
                        role="tablist"
                        aria-label="Sex"
                    >
                        {(['male', 'female'] as Sex[]).map((s) => (
                            <button
                                key={s}
                                type="button"
                                aria-pressed={sex === s}
                                onClick={() => setSex(s)}
                                className={`px-4 py-2 text-sm focus-visible:outline-none focus-visible:shadow-focus ${
                                    sex === s
                                        ? 'bg-brand text-fg-onBrand'
                                        : 'hover:bg-brand-soft border-l first:border-l-0 border-stroke'
                                }`}
                            >
                                {s[0].toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Age */}
                    <div>
                        <label htmlFor="age" className="text-sm font-medium">
                            Age
                        </label>
                        <input
                            id="age"
                            type="number"
                            inputMode="numeric"
                            value={age}
                            onChange={(e) =>
                                setAge(e.target.value === '' ? '' : Number(e.target.value))
                            }
                            placeholder="30"
                            className="mt-2 w-full scandi-input focus:border-stroke-strong"
                        />
                        <p className="mt-1 text-xs text-fg-subtle">Years (10–100)</p>
                    </div>

                    {/* Height */}
                    <div>
                        <label htmlFor="height" className="text-sm font-medium">
                            Height
                        </label>
                        <div className="mt-2 relative">
                            <input
                                id="height"
                                type="number"
                                inputMode="numeric"
                                value={height}
                                onChange={(e) =>
                                    setHeight(e.target.value === '' ? '' : Number(e.target.value))
                                }
                                placeholder="170"
                                className="w-full scandi-input pr-12 focus:border-stroke-strong"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-fg-muted">
                                cm
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-fg-subtle">Range 90–250 cm</p>
                    </div>

                    {/* Weight */}
                    <div>
                        <label htmlFor="weight" className="text-sm font-medium">
                            Weight
                        </label>
                        <div className="mt-2 relative">
                            <input
                                id="weight"
                                type="number"
                                inputMode="numeric"
                                value={weight}
                                onChange={(e) =>
                                    setWeight(e.target.value === '' ? '' : Number(e.target.value))
                                }
                                placeholder="65"
                                className="w-full scandi-input pr-12 focus:border-stroke-strong"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-fg-muted">
                                kg
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-fg-subtle">Range 25–300 kg</p>
                    </div>

                    {/* Activity */}
                    <div>
                        <label htmlFor="activity" className="text-sm font-medium">
                            Activity
                        </label>
                        <select
                            id="activity"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value as Activity)}
                            className="mt-2 w-full scandi-input focus:border-stroke-strong"
                        >
                            {Object.keys(MULTIPLIER).map((k) => (
                                <option key={k} value={k}>
                                    {prettyActivity[k as Activity]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-5 rounded-xl border border-stroke/60 bg-brand-soft p-3 text-sm">
                    Values update results automatically.
                </div>
            </section>

            {/* Results */}
            <aside className="card bg-bg-raised border border-stroke rounded-2xl shadow-card p-6">
                <h2 className="text-lg font-medium mb-3">Your results</h2>
                <dl className="grid grid-cols-2 gap-4">
                    <div>
                        <dt className="text-sm text-fg-muted">BMR</dt>
                        <dd className="text-2xl font-semibold">
                            {bmr ?? '—'}{' '}
                            <span className="text-base font-normal text-fg-subtle">kcal</span>
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm text-fg-muted">TDEE</dt>
                        <dd className="text-2xl font-semibold">
                            {tdee ?? '—'}{' '}
                            <span className="text-base font-normal text-fg-subtle">kcal</span>
                        </dd>
                    </div>
                </dl>

                <div className="mt-4 text-sm text-fg">
                    {tdee ? (
                        <p>
                            For weight loss, try around <strong>−500 kcal/day</strong>. For gain,
                            +300–500 kcal/day.
                        </p>
                    ) : (
                        <p>Please complete inputs to see your BMR/TDEE.</p>
                    )}
                </div>
            </aside>
        </div>
    )
}
