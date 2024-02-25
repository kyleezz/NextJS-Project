import {notFound, redirect} from "next/navigation"

import {authOptions} from "@/lib/auth"
import {getCurrentUser} from "@/lib/session"
import * as React from "react";
import ReviewComponent from "@/components/review-component";
import {Exam, User} from "@prisma/client";
import {db} from "@/lib/db";

interface EditorPageProps {
    params: { examId: string,
        userId: string
    }
}

async function getExamDetailForUser(examId: Exam["id"]) {
    return db.exam.findFirst({
        where: {
            id: examId,
        },
        select: {
            title: true,
            workingTime: true,
            readingTime: true,
            authorId: true,
        },
    })
}

async function getRespondeeDetails(examId: Exam["id"], userId: User["id"]) {
    return db.respondee.findFirst({
        where: {
            examId: examId,
            userId: userId,
        },
        select: {
            id: true,
            startTime: true,
            returned: true,
        },
    })
}

export default async function EditorPage({params}: EditorPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    const detail = await getExamDetailForUser(params.examId)
    if (!detail) {
        notFound()
    }

    if (params.userId != user.id) {
        redirect(`/dashboard`)
    }

    const respondee = await getRespondeeDetails(params.examId, params.userId)

    if (!respondee || !respondee.startTime || !respondee.returned) {
        redirect(`/editor/${params.examId}`)
    }


    return (
        <>
            <ReviewComponent userId={params.userId} examId={params.examId} returned={true} authorId={detail.authorId}/>
        </>
    )
}
