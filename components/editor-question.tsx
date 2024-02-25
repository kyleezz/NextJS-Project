"use client"

import QuestionBox from "@/components/question-box";
import * as React from "react";
import {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {Button} from "@/components/ui/button";
import {useAtom} from "jotai/index";
import {editQuestion, pageNumber, questionsAtoms} from "@/lib/atoms";

interface DataValue {
    key: string,
    content: string,
    marks: number,
    wordCount: number,
    givenMark: number,
}


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function reorder(list : DataValue[], startIndex : number, endIndex : number) : DataValue[]  {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    // console.log(removed)
    result.splice(endIndex, 0, removed);

    return result;
};
export default function EditorQuestion() {

    // const [debouncedInputValue, setDebouncedInputValue] = useState<DataValue[]>();

    // const [data, setData] = useState<DataValue[]>();

    const [page, setPage] = useAtom(pageNumber)
    const [questions, setQuestions] = useAtom(questionsAtoms)
    const [, updateQuestion] = useAtom(editQuestion)

    // console.log(data)

    // useEffect(() => {
    //     if (!data) return;
    //     const timeoutId = setTimeout(() => {
    //         setDebouncedInputValue(data);
    //     }, 200);
    //     return () => clearTimeout(timeoutId);
    // }, [data, 200]);
    //
    // useEffect( () => {
    //     if (!debouncedInputValue) return;
    //     console.log(debouncedInputValue)
    //     updateQuestion(page, debouncedInputValue);
    // }, [debouncedInputValue])

    function handleOnDragEnd(result: DropResult) {
        if (!questions[page - 1]) return;

        if (!result.destination) {
            return;
        }

        const items = reorder(
            questions[page - 1],
            result.source.index,
            result.destination.index
        );
        updateQuestion(page, items)
        // setData(items);
    }

    // console.log(generateUUID())
    const [winReaday, setwinReady] = useState(false);
    useEffect(() => {
        // setData(questions[page - 1])
        setwinReady(true);
    }, []);

    const addNew = () => {
        const newData = [...questions[page - 1], {"key": generateUUID(), "content": "", "marks": 0, "wordCount": 0, "givenMark": 0}]
        updateQuestion(page, newData)

        // setData((d) => {
        //     if (!d) return d;
        //     return [...d, {"key": generateUUID(), "content": ""}]
        // })
    }

    return (
        <>
            {(winReaday && questions[page - 1]) ?
                <div>
                    {questions[page - 1].length >= 1 ?
                        <DragDropContext onDragEnd={(result) => {handleOnDragEnd(result)}}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >

                                        {questions[page - 1].map((res, index) => {
                                            return (
                                                <Draggable key={res.key} draggableId={res.key} index={index}>
                                                    {(provided) => (
                                                        <div ref={provided.innerRef}
                                                             {...provided.draggableProps}
                                                             {...provided.dragHandleProps}>
                                                            <QuestionBox removePart={() => {
                                                                const nextData = questions[page - 1].filter((c, i) => {
                                                                    return (i !== index)
                                                                });
                                                                updateQuestion(page, nextData);
                                                            }} question={page} part={index + 1} value={questions[page - 1][index].content} onChange={(e) => {
                                                                const nextData = questions[page - 1].map((c, i) => {
                                                                    if (i === index) {
                                                                        // Increment the clicked counter
                                                                        return {
                                                                            key: c.key,
                                                                            content: e.target.value,
                                                                            marks: c.marks,
                                                                            wordCount: c.wordCount,
                                                                            givenMark: c.givenMark
                                                                        }
                                                                    } else {
                                                                        return c;
                                                                    }
                                                                });
                                                                updateQuestion(page, nextData)
                                                                // setData(nextData);
                                                            }}
                                                                         onMarkChange={(e) => {
                                                                             const nextData = questions[page - 1].map((c, i) => {
                                                                                 if (i === index) {
                                                                                     // Increment the clicked counter
                                                                                     return {
                                                                                         key: c.key,
                                                                                         content: c.content,
                                                                                         marks: e,
                                                                                         wordCount: c.wordCount,
                                                                                         givenMark: c.givenMark
                                                                                     }
                                                                                 } else {
                                                                                     return c;
                                                                                 }
                                                                             });
                                                                             updateQuestion(page, nextData)
                                                                             // setData(nextData);
                                                                         }}
                                                            mark={questions[page - 1][index].marks}
                                                                         onWCChange={(e) => {
                                                                             const nextData = questions[page - 1].map((c, i) => {
                                                                                 if (i === index) {
                                                                                     // Increment the clicked counter
                                                                                     return {
                                                                                         key: c.key,
                                                                                         content: c.content,
                                                                                         marks: c.marks,
                                                                                         wordCount: e,
                                                                                         givenMark: c.givenMark
                                                                                     }
                                                                                 } else {
                                                                                     return c;
                                                                                 }
                                                                             });
                                                                             updateQuestion(page, nextData)
                                                                             // setData(nextData);
                                                                         }}
                                                            wordCount={questions[page-1][index].wordCount}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext> : null }
                    <Button onClick={addNew} className={"bg-muted-foreground w-[80%]"}>Add</Button>
                </div>
                : null}
        </>
    );

}