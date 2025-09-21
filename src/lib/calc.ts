export type Sex = 'male' | 'female'
export type Units = 'metric' | 'imperial'
export type Activity = 'sedentary' | 'light' | 'moderate' | 'very' | 'athlete'

export interface InputPayload {
    sex: Sex
    age: number
    height: number
    weight: number
    units?: Units
    activity: Activity
    bodyFat?: number
}

const activityMultiplier: Record<Activity, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    athlete: 1.9,
}

export function toMetric(input: InputPayload) {
    // Default to metric when units is not provided. Only convert when explicitly imperial.
    if (input.units === 'imperial') {
        const weightKg = input.weight * 0.45359237
        const heightCm = input.height * 2.54
        return { weightKg, heightCm }
    }
    return { weightKg: input.weight, heightCm: input.height }
}

export function bmrMifflinStJeor(sex: Sex, age: number, weightKg: number, heightCm: number) {
    const s = sex === 'male' ? 5 : -161
    return 10 * weightKg + 6.25 * heightCm - 5 * age + s
}

export function bmrKatchMcArdle(weightKg: number, bodyFatPercent: number) {
    const leanMass = weightKg * (1 - bodyFatPercent / 100)
    return 370 + 21.6 * leanMass
}

export function computeBmr(input: InputPayload) {
    const { weightKg, heightCm } = toMetric(input)
    // If bodyFat is provided, prefer Katch-McArdle estimate (uses lean mass)
    if (typeof input.bodyFat === 'number' && !Number.isNaN(input.bodyFat)) {
        return bmrKatchMcArdle(weightKg, input.bodyFat)
    }
    // Default: Mifflin-St Jeor
    return bmrMifflinStJeor(input.sex, input.age, weightKg, heightCm)
}

export function computeTdee(bmr: number, activity: Activity) {
    return bmr * activityMultiplier[activity]
}

export function goalsFromTdee(tdee: number) {
    return {
        cut20: Math.round(tdee * 0.8),
        cut10: Math.round(tdee * 0.9),
        maintain: Math.round(tdee),
        bulk10: Math.round(tdee * 1.1),
        bulk20: Math.round(tdee * 1.2),
    }
}

export function computeAll(input: InputPayload) {
    const bmr = computeBmr(input)
    const tdee = computeTdee(bmr, input.activity)
    const goals = goalsFromTdee(tdee)
    // Macros (simple defaults):
    // protein: 1.8 g per kg bodyweight
    // fat: 25% of calories -> grams (9 kcal per g)
    // carbs: remaining calories -> grams (4 kcal per g)
    const { weightKg } = toMetric(input)
    const proteinG = Math.round(1.8 * weightKg)
    const fatCalories = Math.round(tdee * 0.25)
    const fatG = Math.round(fatCalories / 9)
    const remainingCalories = Math.round(tdee - (proteinG * 4 + fatG * 9))
    const carbsG = Math.max(0, Math.round(remainingCalories / 4))

    const result = {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        goals,
        macros: {
            protein: proteinG,
            fat: fatG,
            carbs: carbsG,
        },
    }

    return result
}

export type ComputeResult = ReturnType<typeof computeAll>
