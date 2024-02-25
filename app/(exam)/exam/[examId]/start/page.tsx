import {MainNav} from "@/components/main-nav";
import {dashboardConfig} from "@/config/dashboard";
import {UserAccountNav} from "@/components/user-account-nav";
import {SiteFooter} from "@/components/site-footer";
import {getCurrentUser} from "@/lib/session";
import {notFound, redirect} from "next/navigation";
import ExamButton from "@/components/exam-button";
import {Exam, User} from "@prisma/client";
import {db} from "@/lib/db";

interface ExamPageProps {
    params: { examId: string}
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


export default async function ExamPage( { params } : ExamPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    const detail = await getExamDetailForUser(params.examId)
    if (!detail) {
        notFound()
    }

    const respondee = await getRespondeeDetails(params.examId, user.id);

    if (!respondee) {
        redirect('/dashboard')
    }

    const now = new Date()

    if (respondee.startTime != null) {
        if (now.getTime() >= respondee.startTime.getTime() + 1000 * 60 * (detail.readingTime + detail.workingTime)) {
            redirect('/end')
        }
        redirect(`/exam/${params.examId}/questions`)
    }

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={dashboardConfig.mainNav}/>
                    <UserAccountNav
                        user={{
                            name: user.name,
                            image: user.image,
                            email: user.email,
                        }}
                    />
                </div>
            </header>
            <div className="container flex-1 gap-12 md:grid-cols-[200px_1fr]">
                {/*<aside className="hidden w-[200px] flex-col md:flex">*/}
                {/*    <DashboardNav items={dashboardConfig.sidebarNav} />*/}
                {/*</aside>*/}
                <main className="flex w-full overflow-hidden align-center justify-center">
                    <div>
                        <ExamButton userId={user.id} examId={params.examId}/>
                    </div>
                </main>
            </div>
            <SiteFooter className="border-t"/>
        </div>
    )
}