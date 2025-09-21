import { z } from 'zod'

export const InputSchema = z.object({
    sex: z.enum(['male', 'female']),
    age: z.number().int().min(0).max(120),
    height: z.number().positive(),
    weight: z.number().positive(),
    units: z.enum(['metric', 'imperial']),
    activity: z.enum(['sedentary', 'light', 'moderate', 'very', 'athlete']),
    bodyFatPercent: z.number().min(0).max(100).optional(),
})

export type Input = z.infer<typeof InputSchema>
