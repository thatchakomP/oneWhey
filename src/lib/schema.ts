import { z } from 'zod'

export const inputSchema = z.object({
    sex: z.enum(['male', 'female']),
    age: z.number().int().min(10).max(120),
    height: z.number().positive(),
    weight: z.number().positive(),
    activity: z.enum(['sedentary', 'light', 'moderate', 'very', 'athlete']),
})

export type Input = z.infer<typeof inputSchema>
