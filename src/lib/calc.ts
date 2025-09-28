export type Sex = 'male' | 'female'

export function kgFromLbs(lbs: number) {
    return lbs * 0.45359237
}

export function cmFromInches(inches: number) {
    return inches * 2.54
}

export function mifflinStJeor(sex: Sex, age: number, weightKg: number, heightCm: number) {
    const s = sex === 'male' ? 5 : -161
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + s)
}

export function katchMcArdle(weightKg: number, bodyFatPercent: number) {
    // lean mass = weight * (1 - bodyFat)
    const leanMass = weightKg * (1 - bodyFatPercent / 100)
    return Math.round(370 + 21.6 * leanMass)
}

export const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very: 1.9,
}

export function calcTDEE(bmr: number, activity: keyof typeof activityMultipliers) {
    const factor = activityMultipliers[activity] ?? activityMultipliers['sedentary']
    return Math.round(bmr * factor)
}

export function macrosFromCalories(
    calories: number,
    weightKg: number,
    proteinGPerKg = 1.6,
    fatPercent = 0.25
) {
    // protein grams
    const proteinG = Math.round(proteinGPerKg * weightKg)
    const proteinKcal = proteinG * 4

    // fat grams from percentage
    const fatKcal = Math.round(calories * fatPercent)
    const fatG = Math.round(fatKcal / 9)

    // remaining calories to carbs
    const remainingKcal = Math.max(0, calories - proteinKcal - fatKcal)
    const carbsG = Math.round(remainingKcal / 4)

    return { proteinG, carbsG, fatG }
}
