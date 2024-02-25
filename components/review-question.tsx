"use client"

import * as React from "react";
import {useAtom} from "jotai/index";
import {editMark, editQuestion, markAtoms, pageNumber} from "@/lib/atoms";
import QuestionBoxReview from "@/components/question-box-review";

interface DataValue {
    key: string,
    content: string,
    returned?: boolean,
}

export default function ReviewQuestion({questions, userId, returned}) {

    const [page, setPage] = useAtom(pageNumber)
    const [, updateQuestion] = useAtom(editQuestion)
    const [mark, setMarks] = useAtom(markAtoms)
    const [, updateMark] = useAtom(editMark)
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
                        <QuestionBoxReview returned={returned} key={index} userId={userId} question={page} part={index + 1} value={questions[page - 1][index].content} mark={questions[page-1][index].marks} wordCount={questions[page-1][index].wordCount} givenMark={mark[page - 1][index]} onChange={(e) => {
                            updateMark(page, index + 1, e.target.value)
                        }}
                        />
                    );
                })
                : null
            }

        </>
    );

}