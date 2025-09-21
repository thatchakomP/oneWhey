import { describe, it, expect } from 'vitest'
import { computeAll } from './calc'

describe('BMR/TDEE calculations', () => {
    it('computes Mifflin-St Jeor for male example', () => {
        const input = {
            sex: 'male' as const,
            age: 30,
            height: 180,
            weight: 75,
            units: 'metric' as const,
            activity: 'moderate' as const,
        }
        const result = computeAll(input)
        // Mifflin-St Jeor: 10*75 + 6.25*180 -5*30 +5 = 1730
        expect(result.bmr).toBe(1730)
        // TDEE = 1730 * 1.55 = 2681.5 -> 2682
        expect(result.tdee).toBe(2682)
        expect(result.goals.maintain).toBe(2682)
    })

    it('uses Katch-McArdle when bodyFat provided', () => {
        const input = {
            sex: 'female' as const,
            age: 28,
            height: 165,
            weight: 60,
            units: 'metric' as const,
            activity: 'light' as const,
            bodyFat: 30,
        }
        const result = computeAll(input)
        expect(result.bmr).toBe(1277)
    })
})
