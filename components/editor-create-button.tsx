"use client"

import {Button} from "@/components/ui/button"
import {useAtom} from "jotai/index";
import {addNewPage, pageNumber, questionsAtoms} from "@/lib/atoms";


interface ButtonProps {
    active?: boolean
    children?: React.ReactNode
    to: number
    disabled?: boolean
}

function EditorCreateButton({ children , active, to, disabled = false} : ButtonProps) {
    const [page, setPage] = useAtom(pageNumber)
    const [, addPage] = useAtom(addNewPage)
    const [questions] = useAtom(questionsAtoms)

    if (to === -1) {
        return (
            <div className={`${active ? "border-foreground border-b-2 pb-1" : ""}`}>
                <Button disabled={disabled} onClick={() => {
                    addPage()
                    setPage(questions.length + 1)
                }} size="icon" className={`flex items-center justify-center ${active ? "border-2 bg-foreground w-9 h-9 cursor-pointer text-accent border-foreground" : "border-2 bg-accent w-9 h-9 cursor-pointer text-foreground border-foreground"}`}>
                    {children}
                </Button>
            </div>
        )
    }

    return (
        <div className={`${active ? "border-foreground border-b-2 pb-1" : ""} ${disabled ? "pointer-events-none" : ""}`}>
            <div onClick={() => {
                setPage(to)
            }}  className={`rounded-md hover:bg-primary/90 flex items-center justify-center ${active ? "border-2 bg-foreground w-9 h-9 cursor-pointer text-accent border-foreground" : "border-2 bg-accent w-9 h-9 cursor-pointer text-foreground border-foreground"} ${disabled ? "pointer-events-none opacity-50" : ""}`}>
                {children}
            </div>
        </div>
    )
}

export default EditorCreateButton;