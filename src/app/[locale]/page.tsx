'use client'
import React, { useState } from 'react'
import InputField from '../../components/InputField'
import LangSwitcher from '../../components/LangSwitcher'
import calc from '../../lib/calc'
import { useTranslations } from 'next-intl'

export default function Page() {
    const t = useTranslations()
    const [sex, setSex] = useState<'male' | 'female'>('male')
    const [age, setAge] = useState(30)
    const [height, setHeight] = useState(180)
    const [weight, setWeight] = useState(75)
    const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
    const [activity, setActivity] = useState<
        'moderate' | 'sedentary' | 'light' | 'very' | 'athlete'
    >('moderate')
    const [bodyFat, setBodyFat] = useState<number | undefined>(undefined)

    const bmr = calc.computeBMR({ sex, age, height, weight, units, bodyFatPercent: bodyFat })
    const tdee = calc.computeTDEE(bmr, activity)
    const goals = calc.computeGoals(tdee)

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">{t('title')}</h1>
                <LangSwitcher />
            </header>
            <section className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <InputField label={t('sex')}>
                        <select value={sex} onChange={(e) => setSex(e.target.value as any)}>
                            <option value="male">{t('male')}</option>
                            <option value="female">{t('female')}</option>
                        </select>
                    </InputField>
                    <InputField label={t('age')}>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                        />
                    </InputField>
                    <InputField label={t('height', { unit: units === 'metric' ? 'cm' : 'in' })}>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                        />
                    </InputField>
                    <InputField label={t('weight', { unit: units === 'metric' ? 'kg' : 'lb' })}>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                        />
                    </InputField>
                    <InputField label={t('units')}>
                        <select value={units} onChange={(e) => setUnits(e.target.value as any)}>
                            <option value="metric">{t('metric')}</option>
                            <option value="imperial">{t('imperial')}</option>
                        </select>
                    </InputField>
                    <InputField label={t('activity')}>
                        <select
                            value={activity}
                            onChange={(e) => setActivity(e.target.value as any)}
                        >
                            <option value="sedentary">{t('activity.sedentary')}</option>
                            <option value="light">{t('activity.light')}</option>
                            <option value="moderate">{t('activity.moderate')}</option>
                            <option value="very">{t('activity.very')}</option>
                            <option value="athlete">{t('activity.athlete')}</option>
                        </select>
                    </InputField>
                </div>

                <InputField label={t('bodyFat')}>
                    <input
                        type="number"
                        value={bodyFat ?? ''}
                        onChange={(e) =>
                            setBodyFat(e.target.value ? Number(e.target.value) : undefined)
                        }
                    />
                </InputField>

                <div className="p-4 border rounded">
                    <h2 className="font-medium">{t('results')}</h2>
                    <p>
                        {t('bmr')}: {bmr} kcal
                    </p>
                    <p>
                        {t('tdee')}: {tdee} kcal
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="p-2 bg-gray-100">
                            {t('goals.cut20')}: {goals.cut20}
                        </div>
                        <div className="p-2 bg-gray-100">
                            {t('goals.cut10')}: {goals.cut10}
                        </div>
                        <div className="p-2 bg-gray-100">
                            {t('goals.maintain')}: {goals.maintain}
                        </div>
                        <div className="p-2 bg-gray-100">
                            {t('goals.bulk10')}: {goals.bulk10}
                        </div>
                        <div className="p-2 bg-gray-100">
                            {t('goals.bulk20')}: {goals.bulk20}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
