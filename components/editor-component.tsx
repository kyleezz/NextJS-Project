"use client"

import CreateHeader from "@/components/create-header";
import CreateNavPane from "@/components/create-navpane";
import * as React from "react";

import {pageNumber, promptsAtoms, publishedAtoms, questionsAtoms} from "@/lib/atoms";
import {useAtom} from "jotai";
import EditorHeader from "@/components/editor-header";
import EditorPrompt from "@/components/editor-prompt";
import AutosaveFeature from "@/components/autosave-feature";
import EditorQuestion from "@/components/editor-question";
import {Card, CardHeader} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import CreateExamForm from "@/components/create-exam-form";
import CreateUserManagement from "@/components/create-user-management";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import SkeletonHeader from "@/components/skeleton-header";
import {ClipLoader} from "react-spinners";
import {Properties} from "csstype";
import PublishExam from "@/components/publish-exam";

export default function EditorComponent({examId}) {
    const [page, setPage] = useAtom(pageNumber)
    const [allPrompts, setAllPrompts] = useAtom(promptsAtoms)
    const [hydrated, setHydrated] = React.useState(false);
    const [questions, setQuestions] = useAtom(questionsAtoms)
    const [published, setPublished] = useAtom(publishedAtoms)
    const fetchPromptData = async () => {

        const res = await fetch(`/api/exams/${examId}/prompt/`);
        const resJson = await res.json();
        setAllPrompts(JSON.parse(resJson.prompts));
        setPublished(resJson.published);
    };

    const fetchQuestionsData = async () => {

        const res = await fetch(`/api/exams/${examId}/questions/`);
        const resJson = await res.json();
        setQuestions(JSON.parse(resJson.questions));
    };

    React.useEffect(() => {
        setPage(0)
        // setAllPrompts(posts)
        fetchPromptData();
        // setQuestions(JSON.parse(question))
        fetchQuestionsData();
        setPublished(false)
        setHydrated(true);
    }, []);

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
    const style : Properties<string> = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    return (
        <>
            <header>
                <Suspense fallback={<SkeletonHeader />}>
                    <CreateHeader examId={examId}/>
                </Suspense>
                <CreateNavPane>
                    <EditorHeader examId={examId}/>
                </CreateNavPane>
            </header>
            {page === 0 ?
                <Suspense fallback={    <div style={style}>  <ClipLoader
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /></div>}>
                    <div className={"py-5 flex px-8 flex-row h-[calc(100%-120px)] gap-8"}>
                        <Card>
                            <CardHeader className="flex-grow space-y-5 pb-10">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium">Settings</h3>
                                    </div>
                                    <Separator />

                                    <CreateExamForm examId={examId} />
                                </div>

                            </CardHeader>
                        </Card>
                        <div className={"flex-grow h-full flex flex-col"}>
                            <div className={"mb-4"}>
                                {/*<CardHeader className="flex-grow space-y-5 pb-6 h-full">*/}
                                    <PublishExam examId={examId}/>
                                {/*</CardHeader>*/}
                            </div>
                            <Card className={published ? "h-full" :  "h-full hidden"} >
                                <CardHeader className="flex-grow space-y-5 pb-10 h-full">
                                    <CreateUserManagement examId={examId} />
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </Suspense>

                :

                <div className={"py-5 flex px-8 flex-row h-[calc(100%-120px)]"}>
                {/*<ExamForm examId={params.examId} readingTime={detail.readingTime} workingTime={detail.workingTime}*/}
                {/*          title={detail.title}/>*/}
                <div className={"w-1/2 pr-4 overflow-y-scroll block h-full"}>
                    <EditorPrompt examId={examId}/>
                </div>
                <div className={"w-1/2 pl-4 overflow-y-scroll block h-full text-center"}>
                    <EditorQuestion/>
                </div>
            </div>}

            <AutosaveFeature examId={examId} />
        </>
    )
}