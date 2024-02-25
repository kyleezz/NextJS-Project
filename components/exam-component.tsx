"use client"

import CountdownHeader from "@/components/countdown-header";
import CreateNavPane from "@/components/create-navpane";
import ExamHeader from "@/components/exam-header";
import * as React from "react";
import {useState} from "react";
import {useAtom} from "jotai/index";
import {answerAtoms, commentsAtoms, endedAtoms, markAtoms, pageNumber, promptsAtoms, workingAtoms} from "@/lib/atoms";
import ExamPrompt from "@/components/exam-prompt";
import ExamQuestion from "@/components/exam-question";
import AutosaveExam from "@/components/autosave-exam";

export default function ExamComponent({userId, examId}) {

    const [settings, setSettings] = useState();
    const [respondees, setRespondees] = useState();
    const [prompts, setPrompts] = useAtom(promptsAtoms)
    const [questions, setQuestions] = useState()

    const [page, setPage] = useAtom(pageNumber)
    const [ans, setAns] = useAtom(answerAtoms)
    const [work, setWork] = useAtom(workingAtoms);
    const [mark, setMark] = useAtom(markAtoms)
    const [comment, setComment] = useAtom(commentsAtoms)
    const [ended, setEnded] = useAtom(endedAtoms)
    const fetchSettingsData = async () => {

        const res = await fetch(`/api/exams/${examId}/`);
        const resJson = await res.json();
        setSettings(resJson);
    };

    const fetchRespondeeData = async () => {

        const res = await fetch(`/api/respondees/${userId}/${examId}`)
        const resJson = await res.json();
        setRespondees(resJson);
        // console.log(JSON.parse(resJson.answer).answer)
        setAns(JSON.parse(resJson.answer).answer)
        setComment(JSON.parse(resJson.comments).comments)
        setMark(JSON.parse(resJson.marks).marks)
    };

    const fetchPromptData = async () => {

        const res = await fetch(`/api/exams/${examId}/prompt/`);
        const resJson = await res.json();
        setPrompts(JSON.parse(resJson.prompts));
    };

    const fetchQuestionsData = async () => {

        const res = await fetch(`/api/exams/${examId}/questions/`);
        const resJson = await res.json();
        setQuestions(JSON.parse(resJson.questions));
    };

    React.useEffect(() => {
        setPage(1)
        setEnded(false)

        fetchSettingsData();
        fetchRespondeeData()

        fetchPromptData()
        fetchQuestionsData();

        setWork(false)

        // setHydrated(true);
    }, []);


    if (!settings || !respondees || !questions || !prompts) return null;

    return (
        <>
            <header>
                <CountdownHeader respondee={respondees} settings={settings} examId={examId}/>
                <CreateNavPane>
                    <ExamHeader examId={examId} prompts={prompts}/>
                </CreateNavPane>
            </header>
            <div className={"py-5 flex px-8 flex-row h-[calc(100%-120px)]"}>
                {/*<ExamForm examId={params.examId} readingTime={detail.readingTime} workingTime={detail.workingTime}*/}
                {/*          title={detail.title}/>*/}
                <div className={"w-1/2 pr-4 overflow-y-scroll block h-full"}>
                    <ExamPrompt prompts={prompts}/>
                </div>
                <div className={"w-1/2 pl-4 overflow-y-scroll block h-full "}>
                    <ExamQuestion userId={userId} questions={questions}/>
                </div>
            </div>
            <AutosaveExam userId={userId} examId={examId}/>
        </>
    )
}