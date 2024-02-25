import * as z from "zod"

export const questionPatchSchema = z.object({
    prompt: z.string().optional(),
    data: z.string().optional()
})
