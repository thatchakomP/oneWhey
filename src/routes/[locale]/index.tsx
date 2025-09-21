import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inputSchema, Input } from '../../lib/schema'
import { computeAll, ComputeResult } from '../../lib/calc'
import ResultCard from '../../components/ResultCard'

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

    const onSubmit = (data: Input) => {
        try {
            const r = computeAll(data as any)
            setResult(r)
            setResultKey((k) => k + 1)
        } catch (e) {
            setResult(null)
        }
    }

    return (
        <main className="min-h-screen flex items-start justify-center py-8 px-4">
            <div className="container max-w-lg">
                <div className="scandi-card p-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                        {intl.formatMessage({ id: 'title' })}
                    </h1>
                    <form
                        aria-label={intl.formatMessage({ id: 'title' })}
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
                    >
                        <fieldset className="col-span-1 md:col-span-2 border-b pb-4">
                            <legend className="sr-only">
                                {intl.formatMessage({ id: 'sex.label' })}
                            </legend>
                            <div
                                role="radiogroup"
                                aria-label={intl.formatMessage({ id: 'sex.label' })}
                                className="inline-flex bg-panel p-1 rounded-full"
                            >
                                {(['male', 'female'] as const).map((s) => {
                                    const selected = watch('sex') === s
                                    return (
                                        <label
                                            key={s}
                                            className={`px-4 py-1 rounded-full text-sm cursor-pointer transition duration-150 ease-out ${
                                                selected
                                                    ? 'bg-[var(--accent)] text-white'
                                                    : 'text-muted'
                                            }`}
                                        >
                                            <input
                                                {...register('sex')}
                                                type="radio"
                                                value={s}
                                                className="sr-only"
                                            />
                                            {intl.formatMessage({
                                                id: s === 'male' ? 'sex.male' : 'sex.female',
                                            })}
                                        </label>
                                    )
                                })}
                            </div>
                        </fieldset>

                        <div className="flex flex-col">
                            <label htmlFor="age" className="text-xl font-medium text-text">
                                {intl.formatMessage({ id: 'age.label' })}
                            </label>
                            <input
                                id="age"
                                type="number"
                                placeholder="30"
                                {...register('age', { valueAsNumber: true })}
                                className="mt-2 scandi-input focus:outline-none focus-ring w-full"
                            />
                            {errors.age && (
                                <p role="alert" className="text-sm text-red-600">
                                    {String(errors.age.message)}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="height" className="text-xl font-medium text-text">
                                {intl.formatMessage({ id: 'height.label' })}
                            </label>
                            <input
                                id="height"
                                type="number"
                                placeholder="170 cm"
                                {...register('height', { valueAsNumber: true })}
                                className="mt-2 scandi-input focus:outline-none focus-ring w-full"
                            />
                            {errors.height && (
                                <p role="alert" className="text-sm text-red-600">
                                    {String(errors.height.message)}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="weight" className="text-xl font-medium text-text">
                                {intl.formatMessage({ id: 'weight.label' })}
                            </label>
                            <input
                                id="weight"
                                type="number"
                                placeholder="65 kg"
                                {...register('weight', { valueAsNumber: true })}
                                className="mt-2 scandi-input focus:outline-none focus-ring w-full"
                            />
                            {errors.weight && (
                                <p role="alert" className="text-sm text-red-600">
                                    {String(errors.weight.message)}
                                </p>
                            )}
                        </div>

                        {/* Units control removed - using Metric fields (kg, cm) only */}

                        {/* Body fat removed per request; using Mifflin-St Jeor and macros instead */}

                        <div className="flex flex-col">
                            <label htmlFor="activity" className="text-xl font-medium text-text">
                                Activity
                            </label>
                            <select
                                id="activity"
                                {...register('activity')}
                                className="mt-2 scandi-input focus:outline-none focus-ring w-full"
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
                                type="submit"
                                className="px-6 py-3 rounded-2xl bg-[var(--accent)] text-white font-medium"
                            >
                                Calculate
                            </button>
                        </div>
                        <aside className="col-span-1 md:col-span-1">
                            <div aria-live="polite" className="h-full">
                                {result ? (
                                    <div key={resultKey} className="animate-scandi-fade">
                                        <ResultCard
                                            bmr={result.bmr}
                                            tdee={result.tdee}
                                            goals={result.goals}
                                            macros={result.macros}
                                        />
                                    </div>
                                ) : (
                                    <div className="text-sm text-muted">
                                        {intl.formatMessage({ id: 'placeholders.enter_values' })}
                                    </div>
                                )}
                            </div>
                        </aside>
                    </form>
                </div>
            </div>
        </main>
    )
}
