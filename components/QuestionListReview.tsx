import * as React from "react";
import QuestionExam from "@/components/question-exam";
import ReviewAnswer from "@/components/ReviewAnswer";

interface DataValue {
    key: string,
    content: string
}
export default function QuestionListReview({ question, questionDetail, questionIndex, answers }) {

    // const [winReaday, setwinReady] = useState(false);
    // useEffect(() => {
    //     setwinReady(true);
    // }, []);
    //
    // if (!winReaday) return null;
    const data = JSON.parse(questionDetail.data).questions
    console.log(answers)
    return (
        <>
            {data.map((res, index) => {
                return (
                    <div className={"mb-4 bg-neutral-200 p-2 border-l-8 border-blue-900"}>
                        <div className={"flex flex-row items-center m-2"}>
                            <div className={"font-bold text-black text-xl w-14"}>
                                {question + " (" + String.fromCharCode(96 + index + 1) + ")"}
                            </div>
                            <QuestionExam value={data[index].content} disabled={true}/>
                        </div>
                        <ReviewAnswer initialValue={answers[index].content}/>
                    </div>
                );
            })}
        </>
    );

}