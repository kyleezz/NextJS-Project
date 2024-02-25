import QuestionExam from "@/components/question-exam";
import ReviewAnswer from "@/components/review-answer";
import {Input} from "@/components/ui/input";
import WordCounter from "@/components/word-counter";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select";
import {SelectItem} from "@/components/ui/select";
import QuestionBoxExam from "@/components/question-box-exam";
import * as React from "react";
import {ReactNode} from "react";
import Test from "@/components/test";
import {useAtom} from "jotai";
import {finishedAtoms} from "@/lib/atoms";

export default function QuestionBoxReview({ userId, question, part, value, mark, wordCount, givenMark, onChange, returned = false}) {
    const data = question + " (" + String.fromCharCode(96 + part) + ")";

    // const genMarks = () => {
    //     const output : ReactNode = []
    //     for (let i = 1; i <= mark; i++) {
    //         output.push(`<div>{i}</div>`)
    //     }
    //     return output
    // }

    const [finished, setFinished] = useAtom(finishedAtoms)

    return (
        <div className={"mb-4 bg-neutral-200 p-2 border-l-8 border-blue-900"}>
            <div className={"flex flex-row items-center m-2"}>
                <div className={"font-bold text-black text-xl w-14"}>
                    {data}
                </div>
                <QuestionExam value={value} disabled={true}/>
                <Input maxLength={2} value={mark} className={"pointer-events-none mr-[-8px] shadow-none outline-none focus-visible:ring-0 border-0 border-transparent focus:border-transparent focus:ring-0 outline-0 w-12 bg-transparent text-right font-bold text-black text-xl ring-0 focus:outline-none focus:outline-0 focus:shadow-none focus:ring-0 focus:outline-none outline-none ring-transparent focus:ring-transparent focus:shadow-transparent focus-visible:ring-offset-[0px] ring-offset-transparent disabled:text-black"}/>
                <div className={"font-bold text-black text-xl mr-2"}>{mark <= 1 ? "mark" : "marks"}</div>
            </div>
            <ReviewAnswer part={part} returned={returned}/>

            {
                finished ?
                    <div className={"mt-2 flex"}>
                        <div className={"flex align-center text-center h-full items-center"}>
                            <div className={"font-bold text-black text-xl "}>
                                Given Mark:
                            </div>

                            <Input readOnly={returned} maxLength={2} value={givenMark} onChange={onChange} className={"ml-[9px] font-bold text-black text-xl w-14"}/>

                            <div className={"font-bold text-black text-xl pl-2"}>
                                / {mark}
                            </div>

                        </div>

                        <WordCounter question={question} part={part} suggestedWordCount={wordCount}/>
                    </div>
                    :
                    null
            }

        </div>
    )

    //
}