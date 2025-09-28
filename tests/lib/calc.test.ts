import { describe, it, expect } from 'vitest'
import { mifflinStJeor, katchMcArdle, calcTDEE } from '../../src/lib/calc'

describe('calc library', () => {
    it('calculates mifflin st-jeor for male', () => {
        const bmr = mifflinStJeor('male', 30, 80, 180)
        expect(typeof bmr).toBe('number')
    })

    it('calculates katch-mcardle', () => {
        const bmr = katchMcArdle(80, 20)
        expect(typeof bmr).toBe('number')
    })

    it('applies activity multiplier', () => {
        const bmr = 1500
        const tdee = calcTDEE(bmr, 'moderate')
        expect(tdee).toBeGreaterThan(bmr)
    })
})
