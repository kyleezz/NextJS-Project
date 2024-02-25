import {getServerSession} from "next-auth"
import * as z from "zod"

import {authOptions} from "@/lib/auth"
import {db} from "@/lib/db"
import {postPatchSchema} from "@/lib/validations/post"

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
        title: true,
        readingTime: true,
        workingTime: true
      },
    });

    return new Response(JSON.stringify(posts))
  } catch (error) {
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

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.examId))) {
      return new Response(null, { status: 403 })
    }
    console.log(params.examId)

    // Delete the post.
    await db.exam.delete({
      where: {
        id: params.examId as string,
      },
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

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.examId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = postPatchSchema.parse(json)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.exam.update({
      where: {
        id: params.examId,
      },
      data: {
        title: body.title,
        readingTime: body.readingTime,
        workingTime: body.workingTime,

        // settings: body.settings,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

const postSchema = z.object({
  email: z.string()
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
    // TODO: Implement sanitization for content.

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
