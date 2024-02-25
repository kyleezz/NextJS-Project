'use server'

import {redirect} from 'next/navigation'
import {revalidatePath} from 'next/cache'
import {toast} from "@/components/ui/use-toast";

async function deleteQuestion(examId: string, index:  number) {

    const response = await fetch(`/api/questions/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            examId: examId,
            index: index
        }),
        cache: "no-store"
    })

    if (!response?.ok) {
        toast({
            title: "Something went wrong.",
            description: "Your post was not deleted. Please try again.",
            variant: "destructive",
        })
    }

    return true
}

export default async function submit(examId : string, index : number, maxIndex : number) {
    const deleted = await deleteQuestion(examId, index);
    if (deleted) {
        revalidatePath(`/editor/[examId]`)
        if (index === maxIndex) {
            if (index === 1) {
                redirect(`/editor/${examId}/settings`)
            } else {
                redirect(`/editor/${examId}/${index - 1}`)
            }
        } else {

            redirect(`/editor/${examId}/${index}`)
        }
    }
}