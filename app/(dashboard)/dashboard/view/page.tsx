import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import * as React from "react";
import ExamList from "@/components/exam-list";
import {db} from "@/lib/db";
import {Suspense} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import SelectStatus from "@/components/select-status";

export const metadata = {
    title: "Exams",
    description: "Manage the current exams you have been added to.",
}
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function BillingPage() {
    const user = await getCurrentUser()


    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

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



    return (
        <DashboardShell >
                <div className={"flex flex-row"}>
                    <DashboardHeader
                        heading="View Exams"
                        text="Manage the current exams you have been added to."
                    />
                    <SelectStatus />
                </div>

                <div>
                    <Suspense fallback={<p>Loading</p>}>
                        <ExamList userId={user.id} />
                    </Suspense>
                </div>

        </DashboardShell>
    )
}
