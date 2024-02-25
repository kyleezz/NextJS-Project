import * as z from "zod";
import {db} from "@/lib/db";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {boolean} from "zod";

const routeContextSchema = z.object({
    params: z.object({
        userId: z.string(),
        examId: z.string()
    }),
})
const patchSchema = z.object({
    return: z.boolean(),
})

export async function GET(req: Request,
                          context: z.infer<typeof routeContextSchema>) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }

        const response = await db.respondee.findUnique({
            where: {
                userId_examId: {
                    userId: context.params.userId,
                    examId: context.params.examId
                }
            },
            select: {
                returned: true,
            }
        })

        return new Response(JSON.stringify(response))
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        return new Response(null, { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        // Validate the route params.

        const { params } = routeContextSchema.parse(context)
        // Delete the post.
        const json = await req.json()
        const body = patchSchema.parse(json)

        // console.log(body)
        await db.respondee.update({
            where: {
                userId_examId: {
                    userId: params.userId,
                    examId: params.examId
                }
            },
            data : {
                returned: body.return,
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
