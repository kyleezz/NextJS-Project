"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import {Icons} from "@/components/icons";
import * as React from "react";

export default function ExamButton({userId, examId}) {

    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onClick() {
        setIsLoading(true)

        const response = await fetch("/api/respondees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                examId: examId,
                userId: userId
            }),
        })

        setIsLoading(false)

        if (!response?.ok) {

            return toast({
                title: "Something went wrong.",
                description: "Your exam was not started. Please try again.",
                variant: "destructive",
            })
        }

        // This forces a cache invalidation.
        router.refresh()

        router.replace(`/exam/${examId}/`)
    }

    return     <Button onClick={onClick}>
        {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <></>
            // <Icons.add className="mr-2 h-4 w-4" />
        )}
        Start exam
    </Button>

}