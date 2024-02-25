"use client"

import Question from "@/components/question";
import DecorativeAnswer from "@/components/decorative-answer";
import {CloseButton} from '@chakra-ui/react'
import {Input} from "@/components/ui/input";
import {useState} from "react";

export default function QuestionBox({question, part, value, onChange, removePart, onMarkChange, mark, onWCChange, wordCount}) {
    const data = question + " (" + String.fromCharCode(96 + part) + ")";

    const handleChange = (e) => {

        const regex = /^[0-9\b]+$/;
        if (e.target.value === "") {
            onMarkChange(0)
        } else if (mark === 0) {
            onMarkChange(parseInt(e.target.value))
        } else if (regex.test(e.target.value)) {
            onMarkChange(parseInt(e.target.value))
        }
    };

    const handleWCChange = (e) => {
        const nw = parseInt(e.target.value)
        // console.log(nw)
        if (nw < 0 || isNaN(nw)) {
            onWCChange(0)
        }
        if (wordCount === 0) {
            onWCChange(nw)
        }
        if (nw >= 0) {
            onWCChange(nw)
        } else {
            onWCChange(0)
        }
    }

    return (
        <div className={"mb-4 bg-neutral-200 p-2 border-l-8 border-blue-900"}>
            <div className={"flex flex-row items-center m-2"}>
                <div className={"font-bold text-black text-xl w-14"}>
                    {data}
                </div>
                <Question value={value} onChange={onChange} disabled={false}/>
                <Input maxLength={2} value={mark} onChange={handleChange} className={"mr-[-8px] shadow-none outline-none focus-visible:ring-0 border-0 border-transparent focus:border-transparent focus:ring-0 outline-0 w-12 bg-transparent text-right font-bold text-black text-xl ring-0 focus:outline-none focus:outline-0 focus:shadow-none focus:ring-0 focus:outline-none outline-none ring-transparent focus:ring-transparent focus:shadow-transparent focus-visible:ring-offset-[0px] ring-offset-transparent"}/>
                <div className={"font-bold text-black text-xl mr-2"}>{mark <= 1 ? "mark" : "marks"}</div>
                <CloseButton onClick={removePart}/>
            </div>
            <DecorativeAnswer />
            <div className={"mt-2 flex"}>
                <div className={"flex-grow text-right p-2 mr-4"}>
                    Suggested Word Count
                </div>
                <Input type={"number"} className={"w-20"} min={"0"} value={wordCount.toString()} onChange={handleWCChange}/>
            </div>
        </div>
    )
}