// lib/calc.ts
// Deterministic formulas and unit conversions for BMR/TDEE calculator.

export type Sex = 'male' | 'female'
export type Units = 'metric' | 'imperial'

export const activityMultiplier: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    athlete: 1.9,
}

export function toKg(weight: number, units: Units) {
    if (units === 'metric') return weight
    // pounds to kg
    return weight * 0.45359237
}

export function toCm(height: number, units: Units) {
    if (units === 'metric') return height
    // inches to cm
    return height * 2.54
}

export function bmrMifflin(sex: Sex, weightKg: number, heightCm: number, age: number) {
    if (sex === 'male') return 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161
}

export function bmrKatchMcArdle(weightKg: number, bodyFatPercent: number) {
    const leanMass = weightKg * (1 - bodyFatPercent / 100)
    return 370 + 21.6 * leanMass
}

export function computeBMR(params: {
    sex: Sex
    age: number
    height: number
    weight: number
    units: Units
    bodyFatPercent?: number | null
}) {
    const weightKg = toKg(params.weight, params.units)
    const heightCm = toCm(params.height, params.units)
    if (typeof params.bodyFatPercent === 'number' && !Number.isNaN(params.bodyFatPercent)) {
        return Math.round(bmrKatchMcArdle(weightKg, params.bodyFatPercent))
    }
    return Math.round(bmrMifflin(params.sex, weightKg, heightCm, params.age))
}

export function computeTDEE(bmr: number, activityKey: keyof typeof activityMultiplier) {
    const mul = activityMultiplier[activityKey]
    if (!mul) throw new Error('unknown activity multiplier')
    return Math.round(bmr * mul)
}

export function computeGoals(tdee: number) {
    return {
        cut20: Math.round(tdee * 0.8),
        cut10: Math.round(tdee * 0.9),
        maintain: Math.round(tdee),
        bulk10: Math.round(tdee * 1.1),
        bulk20: Math.round(tdee * 1.2),
    }
}

export default {
    toKg,
    toCm,
    computeBMR,
    computeTDEE,
    computeGoals,
}
