"use client"

import * as React from "react";
import {useAtom} from "jotai/index";
import {pageNumber} from "@/lib/atoms";
import QuestionBoxExam from "@/components/question-box-exam";

interface DataValue {
    key: string,
    content: string
}

export default function ExamQuestion({questions, userId}) {

    const [page, setPage] = useAtom(pageNumber)
    // const [, updateQuestion] = useAtom(editQuestion)
    //
    // const [winReaday, setwinReady] = useState(false);
    // useEffect(() => {
    //     // setData(questions[page - 1])
    //     setwinReady(true);
    // }, []);

    return (
        <>
            {questions[page - 1] ?
                questions[page - 1].map((res, index) => {
                    return (
                        <QuestionBoxExam key={index} userId={userId} question={page} part={index + 1} value={questions[page - 1][index].content} mark={questions[page-1][index].marks} wordCount={questions[page-1][index].wordCount} respondeeId={123}/>
                    );
                })
            : null
            }

        </>
    );

}