"use client"

import {toast} from "@/components/ui/use-toast";
import {useEffect} from "react";
import {useAtom} from "jotai/index";
import {answerAtoms, commentsAtoms, markAtoms} from "@/lib/atoms";
import {useDebounce} from "use-debounce";


export default function AutosaveExam({examId, userId}) {

    let timer = 0;
    const [answer, setAnswers] = useAtom(answerAtoms)
    const [mark, setMark] = useAtom(markAtoms)
    const [comment, ] = useAtom(commentsAtoms)

    const [debouncedValue] = useDebounce(answer, 500);

    useEffect(() => {

        if (timer != 0) clearTimeout(timer);

        timer = window.setTimeout(async () => {
            const response = await fetch(`/api/respondees/${userId}/${examId}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    answer: JSON.stringify({answer: debouncedValue}),
                    marks: JSON.stringify({marks: mark}),
                    comments: JSON.stringify({comments: comment})
                }),
            })

            if (!response?.ok) {
                return toast({
                    title: "Something went wrong.",
                    description: "Your question was not saved. Please try again.",
                    variant: "destructive",
                })
            }

        }, 1000);

    }, [debouncedValue])

    return null
}