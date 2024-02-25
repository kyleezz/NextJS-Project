import * as z from "zod";
import {db} from "@/lib/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

const routeContextSchema = z.object({
  params: z.object({
    examId: z.string(),
  }),
})

const patchSchema = z.object({
  questions: z.string()
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
        questions: true
      },
    });

    return new Response(JSON.stringify(posts))
  } catch (error) {
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
    const body = patchSchema.parse(json)

    // console.log(body.questions)
    // Update the post.
    // TODO: Implement sanitization for content.
    await db.exam.update({
      where: {
        id: params.examId,
      },
      data: {
        questions: body.questions
        // settings: body.settings,
      },
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
