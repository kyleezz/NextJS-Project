import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {db} from "@/lib/db";
import * as z from "zod";
import {TComment} from "@udecode/plate-comments";

const postResponseSchema = z.object({
    examId: z.string(),
    userId: z.string(),
})

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }

        const { user } = session

        const exams = await db.respondee.findMany({
            where: {
                userId: user.id,
            },
            select: {
                examId: true,
            }
        })

        const examAuthors = await Promise.all(exams.map(async (element) => {
            return await db.exam.findUnique({
                where: {
                    id: element.examId,
                },
                select: {
                    title: true,
                    authorId: true,
                    readingTime: true,
                    workingTime: true,
                }
            })
        }))

        const authorInfo = await Promise.all(examAuthors.map(async (element) => {
            if (!element) return null;
            return await db.user.findUnique({
                where: {
                    id: element.authorId,
                },
                select: {
                    name: true,
                    image: true,
                }
            })
        }))

        const respondeeInfo = await Promise.all(exams.map(async (element) => {
            return await db.respondee.findUnique({
                where: {
                    userId_examId: {
                        userId: user.id,
                        examId: element.examId
                    }
                },
                select: {
                    startTime: true,
                    returned: true,
                }
            })
        }))

        return new Response(JSON.stringify({title: examAuthors, authorInfo: authorInfo, examIds: exams, respondee: respondeeInfo}))
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }

        const json = await req.json()
        const body = postResponseSchema.parse(json)

        const now = new Date()

        const exam = await db.exam.findFirst({
            where: {
                id: body.examId,
            },
            select: {
                questions: true,
            }
        })

        if (!exam) {
            return new Response(null, { status: 422 })
        }

        exam.questions = JSON.parse(exam.questions)
        const temp : string[][] = [];
        const temp2 : string[][] = [];
        const temp3: Record<string, TComment>[][] = []

        for (let i = 0; i < exam.questions.length; i++) {
            temp.push([...Array(exam.questions[i].length).fill([     {
                id: '1',
                type: "p",
                children: [{ text: '' }],
            },
            ])])
            temp2.push([...Array(exam.questions[i].length).fill(0)])
            temp3.push([...Array(exam.questions[i].length).fill({})])
        }

        const response = await db.respondee.update({
            where: {
                userId_examId: {
                    userId: body.userId,
                    examId: body.examId
                }
            },
            data: {
                startTime: now,
                answer: JSON.stringify({answer : temp}),
                marks: JSON.stringify({marks: temp2}),
                comments: JSON.stringify({comments: temp3})
            }
        })


        return new Response(JSON.stringify(response))
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        // if (error instanceof RequiresProPlanError) {
        //   return new Response("Requires Pro Plan", { status: 402 })
        // }

        return new Response(null, { status: 500 })
    }
}
