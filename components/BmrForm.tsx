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
            try {
                onChange(value as FormValues)
            } catch (e) {
                // ignore invalid intermediate values
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, onChange])

    return (
        <div className="card space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-stone-900">Calculator</h2>
                <p className="text-sm text-stone-600">
                    Enter your information to calculate your BMR and TDEE
                </p>
            </div>

            <form
                onSubmit={handleSubmit((v) => {
                    onChange(v)
                    onCalculate?.(v)
                })}
                aria-describedby="bmr-form-description"
                className="space-y-5"
            >
                <div id="bmr-form-description" className="sr-only">
                    BMR and TDEE calculation form. Results update automatically as you type.
                </div>

                {/* Sex Selection - Enhanced Accessibility */}
                <fieldset className="space-y-3">
                    <legend className="text-sm font-medium text-stone-700">
                        Sex{' '}
                        <span className="text-semantic-error" aria-label="required">
                            *
                        </span>
                    </legend>
                    <div
                        role="radiogroup"
                        aria-label="Select your biological sex for accurate calculation"
                        className="flex gap-2"
                    >
                        <label className={`pill ${selectedSex === 'male' ? 'pill-selected' : ''}`}>
                            <input
                                {...register('sex')}
                                type="radio"
                                value="male"
                                className="sr-only"
                                aria-describedby="sex-help"
                            />
                            <span>Male</span>
                        </label>
                        <label
                            className={`pill ${selectedSex === 'female' ? 'pill-selected' : ''}`}
                        >
                            <input
                                {...register('sex')}
                                type="radio"
                                value="female"
                                className="sr-only"
                                aria-describedby="sex-help"
                            />
                            <span>Female</span>
                        </label>
                    </div>
                    <div id="sex-help" className="text-xs text-stone-500">
                        Biological sex affects metabolic calculations
                    </div>
                </fieldset>

                {/* Age Input - Enhanced */}
                <div className="space-y-2">
                    <label htmlFor="age-input" className="text-sm font-medium text-stone-700">
                        Age{' '}
                        <span className="text-semantic-error" aria-label="required">
                            *
                        </span>
                    </label>
                    <div className="relative">
                        <input
                            {...register('age', { valueAsNumber: true })}
                            id="age-input"
                            type="number"
                            min="15"
                            max="120"
                            inputMode="numeric"
                            className="w-full scandi-input pr-12"
                            aria-describedby="age-help"
                            placeholder="30"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm">
                            yrs
                        </span>
                    </div>
                    <div id="age-help" className="text-xs text-stone-500">
                        Age between 15-120 years
                    </div>
                    {formState.errors.age && (
                        <p role="alert" className="text-xs text-semantic-error">
                            {formState.errors.age.message}
                        </p>
                    )}
                </div>

                {/* Height Input - Enhanced */}
                <div className="space-y-2">
                    <label htmlFor="height-input" className="text-sm font-medium text-stone-700">
                        Height{' '}
                        <span className="text-semantic-error" aria-label="required">
                            *
                        </span>
                    </label>
                    <div className="relative">
                        <input
                            {...register('height', { valueAsNumber: true })}
                            id="height-input"
                            type="number"
                            min="100"
                            max="250"
                            inputMode="numeric"
                            className="w-full scandi-input pr-12"
                            aria-describedby="height-help"
                            placeholder="170"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm">
                            cm
                        </span>
                    </div>
                    <div id="height-help" className="text-xs text-stone-500">
                        Height in centimeters (100-250 cm)
                    </div>
                    {formState.errors.height && (
                        <p role="alert" className="text-xs text-semantic-error">
                            {formState.errors.height.message}
                        </p>
                    )}
                </div>

                {/* Weight Input - Enhanced */}
                <div className="space-y-2">
                    <label htmlFor="weight-input" className="text-sm font-medium text-stone-700">
                        Weight{' '}
                        <span className="text-semantic-error" aria-label="required">
                            *
                        </span>
                    </label>
                    <div className="relative">
                        <input
                            {...register('weight', { valueAsNumber: true })}
                            id="weight-input"
                            type="number"
                            min="30"
                            max="300"
                            step="0.1"
                            inputMode="decimal"
                            className="w-full scandi-input pr-12"
                            aria-describedby="weight-help"
                            placeholder="70"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm">
                            kg
                        </span>
                    </div>
                    <div id="weight-help" className="text-xs text-stone-500">
                        Weight in kilograms (30-300 kg)
                    </div>
                    {formState.errors.weight && (
                        <p role="alert" className="text-xs text-semantic-error">
                            {formState.errors.weight.message}
                        </p>
                    )}
                </div>

                {/* Activity Level - Enhanced */}
                <div className="space-y-2">
                    <label htmlFor="activity-select" className="text-sm font-medium text-stone-700">
                        Activity Level{' '}
                        <span className="text-semantic-error" aria-label="required">
                            *
                        </span>
                    </label>
                    <select
                        {...register('activity')}
                        id="activity-select"
                        className="w-full scandi-input"
                        aria-describedby="activity-help"
                    >
                        <option value="sedentary">Sedentary (little to no exercise)</option>
                        <option value="light">Lightly active (light exercise 1-3 days/week)</option>
                        <option value="moderate">
                            Moderately active (moderate exercise 3-5 days/week)
                        </option>
                        <option value="very">Very active (hard exercise 6-7 days/week)</option>
                        <option value="athlete">Athlete (very hard exercise, physical job)</option>
                    </select>
                    <div id="activity-help" className="text-xs text-stone-500">
                        Select the option that best describes your weekly activity level
                    </div>
                </div>

                {/* Submit Button - Enhanced */}
                <button
                    type="submit"
                    className="w-full min-h-[52px] rounded-full bg-moss text-white font-medium text-lg transition-all duration-150 hover:bg-moss/90 focus-visible active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Calculate BMR and TDEE based on entered values"
                >
                    Calculate Results
                </button>

                {/* Help Text */}
                <div className="pt-2 border-t border-stone-100">
                    <p className="text-xs text-stone-500 text-center">
                        Using the Mifflin-St Jeor equation. Results update automatically as you
                        type.
                    </p>
                </div>
            </form>
        </div>
    )
}
