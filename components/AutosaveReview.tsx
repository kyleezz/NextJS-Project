"use client"

import {toast} from "@/components/ui/use-toast";
import {useEffect} from "react";
import {useAtom} from "jotai/index";
import {answerAtoms, commentsAtoms, markAtoms, questionsAtoms} from "@/lib/atoms";
import {useDebounce} from "use-debounce";


export default function AutosaveReview({examId, userId}) {

    let timer = 0;
    const [answer, setAnswers] = useAtom(answerAtoms)
    const [mark, ] = useAtom(markAtoms)
    const [comment, ] = useAtom(commentsAtoms)

    const [debouncedValue] = useDebounce(answer, 500);
    const [debouncedValue2] = useDebounce(mark, 500)
    const [debouncedValue3] = useDebounce(comment, 500);
    useEffect(() => {

        if (timer != 0) clearTimeout(timer);

        // console.log(debouncedValue)
        timer = window.setTimeout(async () => {
            const response = await fetch(`/api/respondees/${userId}/${examId}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    answer: JSON.stringify({answer: debouncedValue}),
                    marks: JSON.stringify({marks: debouncedValue2}),
                    comments: JSON.stringify({comments: debouncedValue3})
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

    }, [debouncedValue, debouncedValue2, debouncedValue3])

    return null
}