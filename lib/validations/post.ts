import * as z from "zod"

export const postPatchSchema = z.object({
    title: z.string().min(1).optional(),

    // TODO: Type this properly from editorjs block types?
    readingTime: z.number().optional(),
    workingTime: z.number().optional(),
})
