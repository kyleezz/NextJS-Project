import * as z from "zod";
import {db} from "@/lib/db";

const routeContextSchema = z.object({
    params: z.object({
        examId: z.string(),
        userId: z.string()
    }),
})

const deleteSchema = z.object({
    userId: z.string(),
})
export async function DELETE(
    req: Request,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        // Validate the route params.

        const { params } = routeContextSchema.parse(context)

        // Delete the post.
        await db.respondee.delete({
            where: {
                userId_examId: {
                    userId: params.userId,
                    examId: params.examId
                }
            }
        })

        return new Response(null, { status: 204 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }
        console.log(error)
        return new Response(null, { status: 500 })
    }
}
