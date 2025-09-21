import React from 'react'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inputSchema, Input } from '../../lib/schema'
import { computeAll } from '../../lib/calc'

export default function CalculatorPage() {
    const intl = useIntl()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Input>({
        resolver: zodResolver(inputSchema),
        defaultValues: {
            sex: 'male',
            age: 30,
            height: 180,
            weight: 75,
            units: 'metric',
            activity: 'moderate',
        },
    })

    const values = watch()

    const result = useMemo(() => {
        try {
            return computeAll(values as any)
        } catch (e) {
            return null
        }
    }, [values])

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    {intl.formatMessage({ id: 'title' })}
                </h1>

                <form
                    aria-label={intl.formatMessage({ id: 'title' })}
                    onSubmit={handleSubmit(() => {})}
                    className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 st:grid-cols-2 lt:grid-cols-2 sd:grid-cols-3 gap-6 items-start"
                >
                    <fieldset className="col-span-1 md:col-span-2 border-b pb-2">
                        <legend className="sr-only">
                            {intl.formatMessage({ id: 'sex.label' }) || 'Sex'}
                        </legend>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center gap-2">
                                <input
                                    className="h-4 w-4 text-indigo-600"
                                    {...register('sex')}
                                    type="radio"
                                    value="male"
                                    defaultChecked
                                />
                                <span className="text-sm text-gray-700">
                                    {intl.formatMessage({ id: 'sex.male' })}
                                </span>
                            </label>
                            <label className="inline-flex items-center gap-2">
                                <input
                                    className="h-4 w-4 text-indigo-600"
                                    {...register('sex')}
                                    type="radio"
                                    value="female"
                                />
                                <span className="text-sm text-gray-700">
                                    {intl.formatMessage({ id: 'sex.female' })}
                                </span>
                            </label>
                        </div>
                    </fieldset>

                    <div className="flex flex-col">
                        <label htmlFor="age" className="text-sm font-medium text-gray-700">
                            {intl.formatMessage({ id: 'age.label' })}
                        </label>
                        <input
                            id="age"
                            type="number"
                            {...register('age', { valueAsNumber: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.age && (
                            <p role="alert" className="text-sm text-red-600">
                                {String(errors.age.message)}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="height" className="text-sm font-medium text-gray-700">
                            {intl.formatMessage({ id: 'height.label' })}
                        </label>
                        <input
                            id="height"
                            type="number"
                            {...register('height', { valueAsNumber: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.height && (
                            <p role="alert" className="text-sm text-red-600">
                                {String(errors.height.message)}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="weight" className="text-sm font-medium text-gray-700">
                            {intl.formatMessage({ id: 'weight.label' })}
                        </label>
                        <input
                            id="weight"
                            type="number"
                            {...register('weight', { valueAsNumber: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.weight && (
                            <p role="alert" className="text-sm text-red-600">
                                {String(errors.weight.message)}
                            </p>
                        )}
                    </div>

                    <div className="col-span-1 st:col-span-2 sd:col-span-2">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                            {intl.formatMessage({ id: 'units.metric' })} /{' '}
                            {intl.formatMessage({ id: 'units.imperial' })}
                        </p>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center gap-2">
                                <input
                                    className="h-4 w-4 text-indigo-600"
                                    {...register('units')}
                                    type="radio"
                                    value="metric"
                                    defaultChecked
                                />
                                <span className="text-sm text-gray-700">
                                    {intl.formatMessage({ id: 'units.metric' })}
                                </span>
                            </label>
                            <label className="inline-flex items-center gap-2">
                                <input
                                    className="h-4 w-4 text-indigo-600"
                                    {...register('units')}
                                    type="radio"
                                    value="imperial"
                                />
                                <span className="text-sm text-gray-700">
                                    {intl.formatMessage({ id: 'units.imperial' })}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="bodyFat" className="text-sm font-medium text-gray-700">
                            Body-fat % (optional)
                        </label>
                        <input
                            id="bodyFat"
                            type="number"
                            {...register('bodyFat', { valueAsNumber: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="activity" className="text-sm font-medium text-gray-700">
                            Activity
                        </label>
                        <select
                            id="activity"
                            {...register('activity')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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

                    {/* Results panel: on sd (desktop) show as right-side panel, otherwise full width below form fields */}
                    <aside className="col-span-1 sd:col-span-1 sd:row-span-3 mt-2 sd:mt-0">
                        <div
                            aria-live="polite"
                            className="bg-gray-50 border rounded-md p-4 h-full sticky top-6"
                        >
                            {result ? (
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            {intl.formatMessage({ id: 'results.bmr' })}
                                        </div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {result.bmr} kcal
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            {intl.formatMessage({ id: 'results.tdee' })}
                                        </div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {result.tdee} kcal
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Goals</div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            Cut -20%: {result.goals.cut20} kcal
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500">
                                    Enter valid inputs to see results.
                                </div>
                            )}
                        </div>
                    </aside>
                </form>
            </div>
        </main>
    )
}
