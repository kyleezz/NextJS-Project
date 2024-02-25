import {notFound, redirect} from "next/navigation"
import {Exam, User} from "@prisma/client"

import {authOptions} from "@/lib/auth"
import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/session"
import * as React from "react";
import ExamComponent from "@/components/exam-component";

async function getExamDetailForUser(examId: Exam["id"]) {
    return db.exam.findFirst({
        where: {
            id: examId,
        },
        select: {
            title: true,
            workingTime: true,
            readingTime: true,
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
        },
    })
}

interface EditorPageProps {
    params: { examId: string,
        question: number}
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
    //
    // const questionDetail = await getQuestionDetail(params.examId, parseInt(String(params.question)))
    // if (!questionDetail) {
    //     notFound()
    // }
    //
    // const questionCount = await getQuestionCount(params.examId)

    const respondee = await getRespondeeDetails(params.examId, user.id)

    if (!respondee) {
        redirect(`/dashboard`)
    }

    if (!respondee.startTime) {
        redirect(`/exam/${params.examId}`)
    }

    const now = new Date()

    let working = false
    if (now.getTime() >= respondee.startTime.getTime() + 1000 * 60 * detail.readingTime) {
        working = true
    }

    if (now.getTime() >= respondee.startTime.getTime() + 1000 * 60 * (detail.readingTime + detail.workingTime)) {
        redirect('/end')
    }
    //
    // console.log("refreshed " + now)
    // console.log(working)

    return (
        <>
            <ExamComponent userId={user.id} examId={params.examId}/>
        </>
    )
}
