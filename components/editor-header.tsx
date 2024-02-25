import {Icons} from "@/components/icons";
import * as React from "react";
import {useAtom} from "jotai/index";
import {pageNumber, promptsAtoms, publishedAtoms, questionsAtoms} from "@/lib/atoms";
import EditorCreateButton from "@/components/editor-create-button";
import EditorDeleteButton from "@/components/editor-delete-button";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import QuestionBox from "@/components/question-box";

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
interface DataValue {
    key: string,
    content: string,
    marks: number,
    wordCount: number,
    givenMark: number,
}
function reorder(list : DataValue[][], startIndex : number, endIndex : number)   {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    // console.log(removed)
    result.splice(endIndex, 0, removed);

    return result;
};
export default function EditorHeader({examId}) {
    const [allPrompts, setAllPrompts] = useAtom(promptsAtoms)
    const [page, setPage] = useAtom(pageNumber)
    const [published, setPublished] = useAtom(publishedAtoms)
    const [question, setQuestion] = useAtom(questionsAtoms)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    function handleOnDragEnd(result: DropResult) {

        if (!result.destination) {
            setPage(result.source.index)
            return;
        }

        if (result.source.index === result.destination.index) {
            setPage(result.source.index)
            return;
        }

        setPage(result.destination.index)


        const items: DataValue[][] = reorder(
            question,
            result.source.index - 1,
            result.destination.index - 1
        );

        setQuestion(items)

        return;
        // setData(items);
    }

    return (
        <>
        <EditorCreateButton to={0} active={page === 0}>
            <Icons.settings></Icons.settings>
        </EditorCreateButton>


            <DragDropContext onDragEnd={(result) => {handleOnDragEnd(result)}}>
                <Droppable droppableId="droppable" direction={"horizontal"}>
                    {(provided) => (
                        <div
                            className={"flex gap-4"}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >

                            {
                                Array.from({length: allPrompts.length}, (_, index) => {
                                    index += 1
                                    if (index == page) {
                                        return (
                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef}
                                                         {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                        className={`${published ? "pointer-events-none" : ""}`}
                                                    >
                                                        <div>
                                                            <EditorCreateButton disabled={published} to={index} active={true} key={index}>{index}</EditorCreateButton>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );                                    }
                                    return (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}
                                                     className={`${published ? "pointer-events-none" : ""}`}
                                                >
                                                    <div>
                                                        <EditorCreateButton disabled={published} to={index} key={index}>{index}</EditorCreateButton>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    );                                })
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        <EditorCreateButton to={-1} disabled={published}>
            <Icons.add></Icons.add>
        </EditorCreateButton>

            {
                page !== 0 ? <EditorDeleteButton examId={examId}></EditorDeleteButton>: null
            }



    </>
)
}