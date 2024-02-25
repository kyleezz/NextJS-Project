import {useAtom} from "jotai";
import {answerAtoms, pageNumber} from "@/lib/atoms";
import {Input} from "@/components/ui/input";
import {useDebounce} from "use-debounce";
import {useEffect, useRef, useState} from "react";
import {toast} from "@/components/ui/use-toast";
import useInterval from "@use-it/interval";

function visitDescendants(obj) : number {
    let word = 0

    for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === "object") {
            // Recurse
            word += visitDescendants(value);

        } else if (key === "text" && typeof value === "string") {
            let s : string = value
            if (s.length != 0 && s.match(/\b[-?(\w+)?]+\b/gi)) {
                s = s.replace(/(^\s*)|(\s*$)/gi, "");
                s = s.replace(/[ ]{2,}/gi, " ");
                s = s.replace(/\n /, "\n");
                word += s.split(' ').length;
            }
        }
    }

    return word
}
export default function WordCounter({question, part, suggestedWordCount}) {
    const [ans, setAns] = useAtom(answerAtoms)
    const [debouncedValue] = useDebounce(ans, 500);
    const [wordCount, setWordCount] = useState(0)
    const [page, ] = useAtom(pageNumber)

    let timer = 0

    useEffect(() => {

        // if (timer != 0) clearTimeout(timer);

        // timer = window.setTimeout(async () => {
            setWordCount(visitDescendants(ans[question - 1][part - 1]))
        // }, 100);

    }, [ans, page])



    return (
        <div className={"flex-grow text-right p-2 mr-4"} key={page}>
            {wordCount} / {suggestedWordCount} words
        </div>
    )
}