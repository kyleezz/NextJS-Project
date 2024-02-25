import ExamAnswer from "@/components/exam-answer";
import QuestionExam from "@/components/question-exam";
import {useAtom} from "jotai";
import {pageNumber} from "@/lib/atoms";
import {Input} from "@/components/ui/input";
import WordCounter from "@/components/word-counter";

export default function QuestionBoxExam({ userId, respondeeId, question, part, value, mark, wordCount}) {
    const data = question + " (" + String.fromCharCode(96 + part) + ")";
    const [page, setPage] = useAtom(pageNumber)

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
            <ExamAnswer part={part}/>
            <div className={"mt-2 flex"}>
                <WordCounter question={question} part={part} suggestedWordCount={wordCount}/>
            </div>
        </div>
    )
}