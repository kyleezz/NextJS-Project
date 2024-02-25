import {redirect} from "next/navigation"

import {authOptions} from "@/lib/auth"
import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/session"
import {EmptyPlaceholder} from "@/components/empty-placeholder"
import {DashboardHeader} from "@/components/header"
import {ExamCreateButton} from "@/components/exam-create-button"
import {ExamItem} from "@/components/exam-item"
import {DashboardShell} from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
    const exams = await db.exam.findMany({
        where: {
            authorId: user.id,
        },
        select: {
            id: true,
            title: true,
            published: true,
            createdAt: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    })

    return (
        <DashboardShell>
            <DashboardHeader heading="Exams" text="Create and manage exams.">
                <ExamCreateButton />
            </DashboardHeader>
            <div>
                {exams?.length ? (
                    <div className="divide-y divide-border rounded-md border">
                        {exams.map((exam) => (
                            <ExamItem key={exam.id} exam={exam} />
                        ))}
                    </div>
                ) : (
                    <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name="post" />
                        <EmptyPlaceholder.Title>No exams created</EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You don&apos;t have any exams yet.
                        </EmptyPlaceholder.Description>
                        <ExamCreateButton variant="outline" />
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    )
}
