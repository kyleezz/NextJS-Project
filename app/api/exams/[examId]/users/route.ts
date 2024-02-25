import * as z from "zod";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {db} from "@/lib/db";

const routeContextSchema = z.object({
    params: z.object({
        examId: z.string(),
    }),
})

export async function GET(req: Request,
                          context: z.infer<typeof routeContextSchema>) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }

        const posts = await db.exam.findFirst({
            where: {
                id: context.params.examId,
            },
            select: {
                Respondee: true,
                workingTime: true,
                readingTime: true,
            },
        });

        if (!posts) return new Response(JSON.stringify(posts))

        const data = await Promise.all(posts.Respondee.map(async (user, index) => {
            return await db.user.findFirst({
                where: {
                    id: user.userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true
                }
            });
        }))

        const startedData = await Promise.all(posts.Respondee.map(async (user, index) => {
            return await db.respondee.findFirst({
                where: {
                    userId: user.userId,
                    examId: context.params.examId
                },
                select: {
                    startTime: true,
                    returned: true,
                }
            });
        }))

        return new Response(JSON.stringify({data, startedData, readingTime: posts.readingTime, workingTime: posts.workingTime}))
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}

const postSchema = z.object({
    email: z.string(),
})

export async function POST(
    req: Request,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        // Validate route params.
        const { params } = routeContextSchema.parse(context)


        // Get the request body and validate it.
        const json = await req.json()
        const body = postSchema.parse(json)

        // Update the post.

        const user = await db.user.findFirst({
            where: {
                email: body.email,
            },
            select: {
                id: true
            }
        })

        if (!user) {
            return new Response(null, { status: 403 })
        }

        await db.respondee.upsert({
            where: {
                userId_examId: {
                    userId: user.id,
                    examId: params.examId
                }
            },
            update: {},
            create: {
                userId: user.id,
                examId: params.examId,
            }
        })

        return new Response(null, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        console.log(error)
        return new Response(null, { status: 500 })
    }
}

async function verifyCurrentUserHasAccessToPost(examId: string) {
    const session = await getServerSession(authOptions)
    const count = await db.exam.count({
        where: {
            id: examId,
            authorId: session?.user.id,
        },
    })

    return count > 0
}
