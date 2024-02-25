"use client"

import CreateNavPane from "@/components/create-navpane";
import ExamHeader from "@/components/exam-header";
import * as React from "react";
import {useState} from "react";
import {useAtom} from "jotai/index";
import {
    answerAtoms,
    authorAtoms,
    commentsAtoms,
    finishedAtoms,
    markAtoms,
    pageNumber,
    returnedAtoms,
    userAtoms
} from "@/lib/atoms";
import ExamPrompt from "@/components/exam-prompt";
import ReviewQuestion from "@/components/review-question";
import ReviewHeader from "@/components/review-header";
import AutosaveExam from "@/components/autosave-exam";
import AutosaveReview from "@/components/AutosaveReview";

interface prop {
    userId: string,
    examId: string,
    returned?: boolean,
    authorId?: string,
}
export default function ReviewComponent({userId, examId, returned, authorId} : prop) {

    const [settings, setSettings] = useState<{title: string, readingTime: number, workingTime: number}>();
    const [respondees, setRespondees] = useState();
    const [prompts, setPrompts] = useState()
    const [questions, setQuestions] = useState()

    const [page, setPage] = useAtom(pageNumber)
    const [ans, setAns] = useAtom(answerAtoms)
    const [mark, setMark] = useAtom(markAtoms)

    const [startTime, setStartTime] = useState()

    const [finished, setFinished] = useAtom(finishedAtoms)
    const [user, setUser] = useAtom(userAtoms)
    const [author, setAuthor] = useAtom(authorAtoms)

    const [comment, setComment] = useAtom(commentsAtoms)

    const [returnedStatus, setReturnedStatus] = useAtom(returnedAtoms)

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
        setMark(JSON.parse(resJson.marks).marks)
        setComment(JSON.parse(resJson.comments).comments)
        setStartTime(resJson.startTime)
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

    const fetchUserData = async() => {
        const res = await fetch(`/api/users/${userId}`)
        const resJson = await res.json();
        setUser(resJson)
    }

    const fetchAuthorData = async() => {
        const res = await fetch(`/api/users/${authorId}`)
        const resJson = await res.json();
        setAuthor(resJson)
    }

    const fetchReturnedStatus = async() => {
        const res = await fetch(`/api/respondees/${userId}/${examId}/returned`)
        const resJson = await res.json();
        setReturnedStatus(resJson.returned)
    }

    React.useEffect(() => {
        setPage(1)
        setFinished(false)

        fetchSettingsData()
        fetchRespondeeData()

        fetchPromptData()
        fetchQuestionsData()
        fetchUserData()
        fetchAuthorData()
        fetchReturnedStatus()
        // setHydrated(true);
    }, []);

    if (!settings || !respondees || !questions || !prompts || !startTime || !user || !mark || !comment || !author) return null;

    const now = new Date()

    if (new Date(startTime).getTime() + 1000 * 60 * (settings.readingTime + settings.workingTime) <= now.getTime()) {
        setFinished(true)
    }

    return (
        <>
            <header>
                <ReviewHeader settings={settings}/>
                <CreateNavPane>
                    <ExamHeader examId={examId} prompts={prompts} userId={userId} returned={returned}/>
                </CreateNavPane>
            </header>
            <div className={"py-5 flex px-8 flex-row h-[calc(100%-120px)]"}>
                {/*<ExamForm examId={params.examId} readingTime={detail.readingTime} workingTime={detail.workingTime}*/}
                {/*          title={detail.title}/>*/}
                <div className={"w-1/2 pr-4 overflow-y-scroll block h-full"}>
                    <ExamPrompt prompts={prompts}/>
                </div>
                <div className={"w-1/2 pl-4 overflow-y-scroll block h-full"}>
                    <ReviewQuestion userId={userId} questions={questions} returned={returned}/>
                </div>
            </div>
            {
                returned ? null : <AutosaveReview userId={userId} examId={examId}/>
            }
        </>
    )
}