import {redirect} from "next/navigation"
import {Exam, User} from "@prisma/client"

import {authOptions} from "@/lib/auth"
import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/session"
import * as React from "react";
import EditorComponent from "@/components/editor-component";
interface EditorPageProps {
    params: { examId: string,
        question: number}
}

export default async function EditorPage({params}: EditorPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    // const posts = await db.exam.findFirst({
    //     where: {
    //         id: params.examId,
    //     },
    //     select: {
    //         prompts: true
    //     },
    // });
    //
    // const questions = await db.exam.findFirst({
    //     where: {
    //         id: params.examId,
    //     },
    //     select: {
    //         questions: true
    //     },
    // });
    //
    // if (!posts || !questions) return null;

    return (
        <>
            <EditorComponent examId={params.examId} />
        </>
    )
}
