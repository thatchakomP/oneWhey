import { z } from 'zod'

export const inputSchema = z.object({
    sex: z.enum(['male', 'female']),
    age: z.number().int().min(10).max(120),
    height: z.number().positive(),
    weight: z.number().positive(),
    units: z.enum(['metric', 'imperial']),
    activity: z.enum(['sedentary', 'light', 'moderate', 'very', 'athlete']),
    bodyFat: z.number().min(0).max(80).optional(),
})

export type Input = z.infer<typeof inputSchema>
