'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import en from '../../locales/en.json'
import th from '../../locales/th.json'
import InputField from '../../src/components/InputField'
import ResultCard from '../../src/components/ResultCard'
import {
    mifflinStJeor,
    katchMcArdle,
    calcTDEE,
    macrosFromCalories,
    kgFromLbs,
    cmFromInches,
} from '../../src/lib/calc'

const locales: Record<string, any> = { en, th }

export default function LocalePage() {
    const params = useParams() as { locale?: string }
    const locale = params?.locale ?? 'en'
    const t = locales[locale] ?? locales['en']

    const [sex, setSex] = useState<'male' | 'female'>('male')
    const [age, setAge] = useState<string>('')
    const [weight, setWeight] = useState<string>('')
    const [height, setHeight] = useState<string>('')
    const [ageError, setAgeError] = useState<string>('')
    const [weightError, setWeightError] = useState<string>('')
    const [heightError, setHeightError] = useState<string>('')
    const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
    const [activity, setActivity] = useState<any>('moderate')
    // bodyFat input removed — always use Mifflin-St Jeor for BMR

    const [result, setResult] = useState<any>(null)

    function onCalculate() {
        // parse inputs
        const ageNum = Number(age)
        const weightNum = Number(weight)
        const heightNum = Number(height)

        if (
            !Number.isFinite(ageNum) ||
            !Number.isFinite(weightNum) ||
            !Number.isFinite(heightNum)
        ) {
            // Simple validation: require numeric inputs for these fields
            // Keep UX minimal — use alert to signal missing values
            alert('Please enter numeric values for age, weight, and height.')
            return
        }

        let kg = weightNum
        let cm = heightNum
        if (units === 'imperial') {
            kg = kgFromLbs(weightNum)
            cm = cmFromInches(heightNum)
        }

        const bmr = mifflinStJeor(sex, ageNum, kg, cm)
        const tdee = calcTDEE(bmr, activity)
        const macros = macrosFromCalories(tdee, kg)

        setResult({ bmr, tdee, ...macros })
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-shadow">{t.title}</h1>
            <section className="card mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm muted-text">{t.sex}</label>
                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => setSex('male')}
                                className={`kbd ${sex === 'male' ? 'action-btn' : ''}`}
                            >
                                {t.male}
                            </button>
                            <button
                                onClick={() => setSex('female')}
                                className={`kbd ${sex === 'female' ? 'action-btn' : ''}`}
                            >
                                {t.female}
                            </button>
                        </div>

                        <InputField
                            id="age"
                            label={t.age}
                            type="number"
                            value={age}
                            onChange={(e) => {
                                setAge(e.target.value)
                                const err = !e.target.value
                                    ? t.required
                                    : isNaN(Number(e.target.value))
                                    ? t.invalidNumber
                                    : ''
                                setAgeError(err)
                            }}
                            placeholder="Please enter age"
                            error={ageError}
                        />
                        <InputField
                            id="height"
                            label={t.height}
                            type="number"
                            value={height}
                            onChange={(e) => {
                                setHeight(e.target.value)
                                const err = !e.target.value
                                    ? t.required
                                    : isNaN(Number(e.target.value))
                                    ? t.invalidNumber
                                    : ''
                                setHeightError(err)
                            }}
                            placeholder="Please enter height"
                            error={heightError}
                        />
                        <InputField
                            id="weight"
                            label={t.weight}
                            type="number"
                            value={weight}
                            onChange={(e) => {
                                setWeight(e.target.value)
                                const err = !e.target.value
                                    ? t.required
                                    : isNaN(Number(e.target.value))
                                    ? t.invalidNumber
                                    : ''
                                setWeightError(err)
                            }}
                            placeholder="Please enter weight"
                            error={weightError}
                        />

                        <label className="block text-sm muted-text mt-2">{t.units}</label>
                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => setUnits('metric')}
                                className={`kbd ${units === 'metric' ? 'action-btn' : ''}`}
                            >
                                {t.metric}
                            </button>
                            <button
                                onClick={() => setUnits('imperial')}
                                className={`kbd ${units === 'imperial' ? 'action-btn' : ''}`}
                            >
                                {t.imperial}
                            </button>
                        </div>

                        <label className="block text-sm muted-text">{t.activity}</label>
                        <select
                            className="scandi-input"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                        >
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Light</option>
                            <option value="moderate">Moderate</option>
                            <option value="active">Active</option>
                            <option value="very">Very active</option>
                        </select>

                        {/* body fat field removed per request */}

                        <div className="mt-4">
                            {/** disable when there are validation errors or required fields missing */}
                            <button
                                className={`action-btn ${
                                    ageError ||
                                    weightError ||
                                    heightError ||
                                    !age ||
                                    !weight ||
                                    !height
                                        ? 'opacity-50 pointer-events-none'
                                        : ''
                                }`}
                                onClick={onCalculate}
                                disabled={
                                    !!(
                                        ageError ||
                                        weightError ||
                                        heightError ||
                                        !age ||
                                        !weight ||
                                        !height
                                    )
                                }
                            >
                                {t.calculate}
                            </button>
                        </div>
                    </div>

                    <div>
                        {result ? (
                            <ResultCard
                                bmr={result.bmr}
                                tdee={result.tdee}
                                proteinG={result.proteinG}
                                carbsG={result.carbsG}
                                fatG={result.fatG}
                            />
                        ) : (
                            <div className="muted-text">{t.results} will appear here</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
