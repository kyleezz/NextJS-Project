import * as React from "react";
import {useAtom} from "jotai/index";
import {pageNumber} from "@/lib/atoms";
import EditorCreateButton from "@/components/editor-create-button";
import TurninButton from "@/components/turnin-button";

interface props {
    prompts,
    examId,
    userId?,
    returned?
}
export default function ExamHeader(prop : props) {
    const [page, setPage] = useAtom(pageNumber)

    console.log(prop.userId)
    return (
        <>
            {
                Array.from({length: prop.prompts.length}, (_, index) => {
                    index += 1
                    if (index == page) {
                        return (<EditorCreateButton to={index} active={true} key={index}>{index}</EditorCreateButton>)
                    }
                    return (<EditorCreateButton to={index} key={index}>{index}</EditorCreateButton>)
                })
            }

            {
                (prop.userId && !prop.returned) ? <TurninButton examId={prop.examId} userId={prop.userId}></TurninButton> : <></>
            }
        </>
    )
}