import { describe, it, expect } from 'vitest'
import {
    toKg,
    toCm,
    bmrMifflin,
    bmrKatchMcArdle,
    computeBMR,
    computeTDEE,
    computeGoals,
} from './calc'

describe('unit conversions', () => {
    it('converts pounds to kg', () => {
        expect(toKg(220, 'imperial')).toBeCloseTo(99.7903, 4)
    })
    it('converts inches to cm', () => {
        expect(toCm(70, 'imperial')).toBeCloseTo(177.8, 3)
    })
})

describe('Mifflin-St Jeor', () => {
    it('computes male BMR correctly', () => {
        const bmr = bmrMifflin('male', 75, 180, 30)
        // 10*75 + 6.25*180 - 5*30 + 5 = 1730
        expect(Math.round(bmr)).toBe(1730)
    })
    it('computes female BMR correctly', () => {
        const bmr = bmrMifflin('female', 60, 165, 25)
        // 10*60 + 6.25*165 - 5*25 - 161 = 1345.25 -> 1345
        expect(Math.round(bmr)).toBe(1345)
    })
})

describe('Katch-McArdle', () => {
    it('computes BMR with body fat', () => {
        const bmr = bmrKatchMcArdle(75, 20)
        expect(Math.round(bmr)).toBe(Math.round(370 + 21.6 * (75 * 0.8)))
    })
})

describe('computeBMR/computeTDEE/goals', () => {
    it('computes overall pipeline', () => {
        const bmr = computeBMR({ sex: 'male', age: 30, height: 180, weight: 75, units: 'metric' })
        const tdee = computeTDEE(bmr, 'moderate')
        const goals = computeGoals(tdee)
        // computeBMR returns rounded value
        expect(bmr).toBe(1730)
        expect(tdee).toBe(Math.round(1730 * 1.55))
        expect(goals.maintain).toBe(tdee)
    })
})
