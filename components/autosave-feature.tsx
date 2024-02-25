"use client"

import {toast} from "@/components/ui/use-toast";
import {useEffect} from "react";
import {useAtom} from "jotai/index";
import {promptsAtoms, questionsAtoms} from "@/lib/atoms";
import {useDebounce} from "use-debounce";


export default function AutosaveFeature({examId}) {

    let timer = 0;
    const [allPrompts, setAllPrompts] = useAtom(promptsAtoms)
    const [questions, setQuestions] = useAtom(questionsAtoms)

    const [debouncedQuestions] = useDebounce(questions, 500);
    const [debouncedPrompts] = useDebounce(allPrompts, 500);

    useEffect(() => {

        if (timer != 0) clearTimeout(timer);

        timer = window.setTimeout(async () => {
            const response = await fetch(`/api/exams/${examId}/prompt`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: JSON.stringify(debouncedPrompts),
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

    }, [debouncedPrompts])

    let timer2 = 0;
    useEffect(() => {

        if (timer2 != 0) clearTimeout(timer2);
        timer2 = window.setTimeout(async () => {
            const response = await fetch(`/api/exams/${examId}/questions`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questions: JSON.stringify(debouncedQuestions),
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

    }, [debouncedQuestions])

    return null
}