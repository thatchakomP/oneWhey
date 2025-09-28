import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { useRef, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { inputSchema, Input } from '../../lib/schema'
import { computeAll, ComputeResult } from '../../lib/calc'
import ResultCard from '../../components/ResultCard'
import SexToggle from '../../components/SexToggle'

export default function CalculatorPage() {
    const intl = useIntl()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Input>({
        resolver: zodResolver(inputSchema),
        mode: 'onSubmit',
    })

    const [result, setResult] = useState<null | ComputeResult>(null)
    const [resultKey, setResultKey] = useState<number>(0)
    const [overlayOpen, setOverlayOpen] = useState(false)
    const closeBtnRef = useRef<HTMLButtonElement | null>(null)
    const calculateBtnRef = useRef<HTMLButtonElement | null>(null)
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)

    const onSubmit = (data: Input) => {
        try {
            const r = computeAll(data as any)
            setResult(r)
            setResultKey((k) => k + 1)
            setOverlayOpen(true)
        } catch (e) {
            setResult(null)
        }
    }

    // Focus management: move focus to close button when overlay opens
    useEffect(() => {
        if (overlayOpen) {
            // hide background content from screen readers
            if (contentRef.current) contentRef.current.setAttribute('aria-hidden', 'true')
            // give the DOM a tick then focus
            setTimeout(() => closeBtnRef.current?.focus(), 0)
            const onKey = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setOverlayOpen(false)
                    setResult(null)
                }

                // focus trap: keep focus within overlay when Tab pressed
                if (e.key === 'Tab') {
                    const root = overlayRef.current
                    if (!root) return
                    const focusable = Array.from(
                        root.querySelectorAll<HTMLElement>(
                            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                        )
                    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null)
                    if (focusable.length === 0) {
                        e.preventDefault()
                        closeBtnRef.current?.focus()
                        return
                    }
                    const first = focusable[0]
                    const last = focusable[focusable.length - 1]
                    const active = document.activeElement as HTMLElement | null
                    if (e.shiftKey) {
                        if (active === first || !root.contains(active)) {
                            e.preventDefault()
                            last.focus()
                        }
                    } else {
                        if (active === last || !root.contains(active)) {
                            e.preventDefault()
                            first.focus()
                        }
                    }
                }
            }
            window.addEventListener('keydown', onKey)
            return () => {
                window.removeEventListener('keydown', onKey)
                if (contentRef.current) contentRef.current.removeAttribute('aria-hidden')
            }
        } else {
            // return focus to calculate button
            calculateBtnRef.current?.focus()
            if (contentRef.current) contentRef.current.removeAttribute('aria-hidden')
        }
    }, [overlayOpen])

    return (
        <main className="min-h-screen bg-stone-50 flex items-start justify-start py-8 px-8">
            <div className="container max-w-6xl mx-auto">
                <div className="card">
                    <h1 className="text-2xl font-semibold text-stone-900 mb-4">
                        {intl.formatMessage({ id: 'title' })}
                    </h1>

                    <div className="md:flex md:items-start md:justify-between gap-8">
                        <form
                            aria-label={intl.formatMessage({ id: 'title' })}
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 items-start md:w-2/3"
                        >
                            {/* Sex toggle moved into its own component - spans full width on md+ */}
                            <div className="col-span-1 md:col-span-2">
                                <SexToggle
                                    ariaLabel={intl.formatMessage({ id: 'sex.label' })}
                                    value={(watch('sex') as any) ?? null}
                                    onChange={(v) => {
                                        // update the form value when toggle changes
                                        const e = { target: { name: 'sex', value: v } } as any
                                        // call the form's registered onChange if available
                                        const reg = (register('sex') as any) || {}
                                        reg.onChange?.(e)
                                    }}
                                />
                            </div>

                            <div className="col-span-1 flex flex-col space-y-1">
                                <label htmlFor="age" className="text-lg font-medium text-stone-900">
                                    {intl.formatMessage({ id: 'age.label' })}
                                </label>
                                <input
                                    id="age"
                                    type="number"
                                    placeholder="30"
                                    {...register('age', { valueAsNumber: true })}
                                    className="mt-2 scandi-input focus-visible w-full md:max-w-md field-width"
                                />
                                {errors.age && (
                                    <p role="alert" className="text-sm text-semantic-error">
                                        {String(errors.age.message)}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 flex flex-col space-y-1">
                                <label
                                    htmlFor="height"
                                    className="text-lg font-medium text-stone-900"
                                >
                                    {intl.formatMessage({ id: 'height.label' })}
                                </label>
                                <input
                                    id="height"
                                    type="number"
                                    placeholder="170 cm"
                                    {...register('height', { valueAsNumber: true })}
                                    className="mt-2 scandi-input focus-visible w-full md:max-w-md field-width"
                                />
                                {errors.height && (
                                    <p role="alert" className="text-sm text-semantic-error">
                                        {String(errors.height.message)}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 flex flex-col space-y-1">
                                <label
                                    htmlFor="weight"
                                    className="text-lg font-medium text-stone-900"
                                >
                                    {intl.formatMessage({ id: 'weight.label' })}
                                </label>
                                <input
                                    id="weight"
                                    type="number"
                                    placeholder="65 kg"
                                    {...register('weight', { valueAsNumber: true })}
                                    className="mt-2 scandi-input focus-visible w-full md:max-w-md field-width"
                                />
                                {errors.weight && (
                                    <p role="alert" className="text-sm text-semantic-error">
                                        {String(errors.weight.message)}
                                    </p>
                                )}
                            </div>

                            {/* Units control removed - using Metric fields (kg, cm) only */}

                            {/* Body fat removed per request; using Mifflin-St Jeor and macros instead */}

                            <div className="col-span-1 flex flex-col space-y-1">
                                <label
                                    htmlFor="activity"
                                    className="text-lg font-medium text-stone-900"
                                >
                                    Activity
                                </label>
                                <select
                                    id="activity"
                                    {...register('activity')}
                                    className="mt-2 scandi-input focus-visible w-full md:max-w-md field-width"
                                >
                                    <option value="sedentary">
                                        {intl.formatMessage({ id: 'activity.sedentary' })}
                                    </option>
                                    <option value="light">
                                        {intl.formatMessage({ id: 'activity.light' })}
                                    </option>
                                    <option value="moderate">
                                        {intl.formatMessage({ id: 'activity.moderate' })}
                                    </option>
                                    <option value="very">
                                        {intl.formatMessage({ id: 'activity.very' })}
                                    </option>
                                    <option value="athlete">
                                        {intl.formatMessage({ id: 'activity.athlete' })}
                                    </option>
                                </select>
                            </div>

                            {/* Calculate button and Results panel: button submits form; on sd (desktop) results show as right-side panel */}
                            <div className="col-span-1 md:col-span-2 flex items-center gap-4">
                                <button
                                    ref={calculateBtnRef}
                                    type="submit"
                                    className="min-h-[44px] px-6 py-3 rounded-xl bg-moss text-white font-medium hover:opacity-90 focus-visible transition-all duration-200"
                                >
                                    Calculate
                                </button>
                            </div>
                        </form>

                        <aside className="md:w-1/3">
                            <div aria-live="polite" className="h-full">
                                {result ? (
                                    <div key={resultKey} className="animate-fade-in">
                                        {/* backdrop and fixed overlay for md+ */}
                                        <div className="hidden md:block">
                                            <div
                                                className="results-backdrop"
                                                onClick={() => {
                                                    setResult(null)
                                                    setOverlayOpen(false)
                                                }}
                                            />
                                        </div>

                                        <div className="card md:static md:float-right md:w-full z-40 md:ml-6">
                                            <div className="flex justify-end mb-4">
                                                <button
                                                    ref={closeBtnRef}
                                                    aria-label="Close results"
                                                    className="p-2 rounded-full text-stone-500 hover:bg-stone-100 focus-visible"
                                                    onClick={() => {
                                                        setResult(null)
                                                        setOverlayOpen(false)
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            <ResultCard
                                                bmr={result.bmr}
                                                tdee={result.tdee}
                                                goals={result.goals}
                                                macros={result.macros}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-sm text-stone-500 p-6 bg-stone-100 rounded-xl border border-stone-200">
                                        {intl.formatMessage({ id: 'placeholders.enter_values' })}
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    )
}
