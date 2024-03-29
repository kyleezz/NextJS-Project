import {getServerSession} from "next-auth/next"
import * as z from "zod"

import {authOptions} from "@/lib/auth"
import {db} from "@/lib/db"
// import { RequiresProPlanError } from "@/lib/exceptions"
// import { getUserSubscriptionPlan } from "@/lib/subscription"

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const posts = await db.exam.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      where: {
        authorId: user.id,
      },
    })

    return new Response(JSON.stringify(posts))
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
    const body = postCreateSchema.parse(json)

    const post = await db.exam.create({
      data: {
        title: body.title,
        // content: body.content,
        authorId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(post))
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
