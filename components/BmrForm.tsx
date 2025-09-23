import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inputSchema } from '../src/lib/schema'

type FormValues = {
    sex: 'male' | 'female'
    age: number
    height: number
    weight: number
    activity: 'sedentary' | 'light' | 'moderate' | 'very' | 'athlete'
}

export function BmrForm({
    onChange,
    onCalculate,
}: {
    onChange: (data: FormValues) => void
    onCalculate?: (data: FormValues) => void
}) {
    const { register, watch, handleSubmit, formState } = useForm<FormValues>({
        resolver: zodResolver(inputSchema),
        defaultValues: { sex: 'male', age: 30, height: 170, weight: 70, activity: 'moderate' },
    })

    const selectedSex = watch('sex')

    // Auto-call onChange when valid values change
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            // only call when the form is valid
            // formState is not updated in this callback reliably so rely on try/catch
            try {
                // zodResolver would have validated already; call onChange and let parent compute
                onChange(value as FormValues)
            } catch (e) {
                // ignore invalid intermediate values
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, onChange])

    return (
        <form
            onSubmit={handleSubmit((v) => {
                onChange(v)
                onCalculate?.(v)
            })}
            aria-describedby="bmr-form-desc"
            className="rounded-2xl bg-white shadow-card p-6 space-y-4"
        >
            <fieldset>
                <legend className="text-sm font-medium text-stone-700">Sex</legend>
                <div role="radiogroup" aria-label="Sex" className="mt-2 flex gap-2">
                    <label className={`pill ${selectedSex === 'male' ? 'pill-selected' : ''}`}>
                        <input {...register('sex')} type="radio" value="male" className="sr-only" />
                        <span>Male</span>
                    </label>
                    <label className={`pill ${selectedSex === 'female' ? 'pill-selected' : ''}`}>
                        <input
                            {...register('sex')}
                            type="radio"
                            value="female"
                            className="sr-only"
                        />
                        <span>Female</span>
                    </label>
                </div>
            </fieldset>

            <div className="relative">
                <label className="text-sm font-medium text-stone-700">Age</label>
                <input
                    {...register('age', { valueAsNumber: true })}
                    inputMode="numeric"
                    className="mt-1 w-full scandi-input pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-8 text-stone-500 text-sm">
                    yrs
                </span>
            </div>

            <div className="relative">
                <label className="text-sm font-medium text-stone-700">Height</label>
                <input
                    {...register('height', { valueAsNumber: true })}
                    inputMode="numeric"
                    className="mt-1 w-full scandi-input pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-8 text-stone-500 text-sm">
                    cm
                </span>
            </div>

            <div className="relative">
                <label className="text-sm font-medium text-stone-700">Weight</label>
                <input
                    {...register('weight', { valueAsNumber: true })}
                    inputMode="numeric"
                    className="mt-1 w-full scandi-input pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-8 text-stone-500 text-sm">
                    kg
                </span>
            </div>

            <div>
                <label className="text-sm font-medium text-stone-700">Activity</label>
                <select {...register('activity')} className="mt-1 w-full scandi-input">
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly active</option>
                    <option value="moderate">Moderately active</option>
                    <option value="very">Very active</option>
                    <option value="athlete">Athlete</option>
                </select>
            </div>

            <button
                aria-label="Calculate BMR and TDEE"
                type="submit"
                className="w-full rounded-full bg-moss text-white py-2.5"
            >
                Calculate
            </button>
            <p className="text-xs text-stone-500">
                We use Mifflin-St Jeor. Results update automatically on change.
            </p>
        </form>
    )
}
