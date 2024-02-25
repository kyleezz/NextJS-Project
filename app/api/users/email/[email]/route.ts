import {z} from "zod";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {db} from "@/lib/db";

const routeContextSchema = z.object({
    params: z.object({
        email: z.string(),
    }),
})

export async function GET(req: Request,
                          context: z.infer<typeof routeContextSchema>) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }
        const posts = await db.user.findFirst({
            where: {
                email: context.params.email,
            },
            select: {
                id: true,
            },
        });

        return new Response(JSON.stringify(posts))
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}