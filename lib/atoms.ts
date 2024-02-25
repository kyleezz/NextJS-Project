import { atom } from 'jotai'
import {ELEMENT_PARAGRAPH} from "@udecode/plate-paragraph";
import {TComment} from "@udecode/plate-comments";

interface DataValue {
    key: string,
    content: string,
    marks: number,
    wordCount: number,
    givenMark: number,
}

const updateQuestions = (data : DataValue[][], updateIndex : number, content : DataValue[]) : DataValue[][] => {
    return data.map((current, index) => {
        if (index === updateIndex) {
            return content;
        } else {
            return current;
        }
    })
}

const deleteQuestion = (data : DataValue[][], deleteIndex : number) : DataValue[][] => {
    return data.filter((current, index) => {
        return index != deleteIndex
    })
}

const deletePrompt = (data : any[], deleteIndex : number) : any[] => {
    return data.filter((current, index) => {
        return index != deleteIndex
    })
}
export const questionsAtoms = atom<DataValue[][]>([])

export const commentsAtoms = atom<Record<string, TComment>[][]>([])

export const addNewPage = atom(() => "",
    (get, set) => {
    set(questionsAtoms, [...get(questionsAtoms), []]);
    set(promptsAtoms, [...get(promptsAtoms), [     {
        id: '1',
        type: ELEMENT_PARAGRAPH,
        children: [{ text: '' }],
    },
        ]
    ])
    }
)
export const editQuestion = atom(() => "",
    (get, set, index : number, content : DataValue[]) => {
    set(questionsAtoms, updateQuestions(get(questionsAtoms), index - 1, content))
    })

export const deletePage = atom(() => "",
    (get, set, index : number) => {
    set(questionsAtoms, deleteQuestion(get(questionsAtoms), index - 1));
    set(promptsAtoms, deletePrompt(get(promptsAtoms), index - 1))
    })

export const pageNumber = atom<number>(0)

export const promptsAtoms = atom<any[]>([])

const updatePrompt = (data : string[], updateIndex : number, content : string) : string[] => {
    return data.map((current, index) => {
        if (index === updateIndex) {
            return content
        } else {
            return current;
        }
    })
}
export const editPrompt = atom(() => "",
    (get, set, index : number, content : string) => {
        set(promptsAtoms, updatePrompt(get(promptsAtoms), index - 1, content))
    })
export const titleAtoms = atom<string>("")

export const workingAtoms = atom<boolean>(false)

export const answerAtoms = atom<any[][]>([])

export const markAtoms = atom<number[][]>([])

const updateMark = (data : number[][], question : number, part : number, content : any) : number[][] => {
    return data.map((current, index) => {
        if (index === question) {
            return data[index].map((cur, index) => {
                if (index === part) {
                    return content;
                } else {
                    return cur;
                }
            })
        } else {
            return current;
        }
    })
}
export const editMark = atom(() => "",
    (get, set, question : number, part : number, content : any) => {
        set(markAtoms, updateMark(get(markAtoms), question - 1, part - 1, content))
    })

const updateAnswer = (data : string[][], question : number, part : number, content : any) : string[][] => {
    return data.map((current, index) => {
        if (index === question) {
            return data[index].map((cur, index) => {
                if (index === part) {
                    return content;
                } else {
                    return cur;
                }
            })
        } else {
            return current;
        }
    })
}
export const editAnswer = atom(() => "",
    (get, set, question : number, part : number, content : any) => {
        set(answerAtoms, updateAnswer(get(answerAtoms), question - 1, part - 1, content))
    })

const updateComment = (data, question : number, part : number, remove : string) => {
    return data.map((current, index) => {
        if (index === question) {
            return data[index].map((cur, index) => {
                if (index === part) {
                    const temp : Record<string, TComment[]> = {}

                    for (const key in cur) {
                        if (key != remove) temp[key] = cur[key]
                    }

                    return temp;
                } else {
                    return cur;
                }
            })
        } else {
            return current;
        }
    })
}
export const removeComment = atom(() => "",
    (get, set, question : number, part : number, remove : string) => {
    set(commentsAtoms, updateComment(get(commentsAtoms), question - 1, part - 1, remove))
    })

export const publishedAtoms = atom<boolean>(false)
export const finishedAtoms = atom<boolean>(false)
export const userAtoms = atom<{name: string, email: string, image: string}>({name: "", email: "", image: ""})

export const authorAtoms = atom<{name: string, email: string, image: string}>({name: "", email: "", image: ""})

export const endedAtoms = atom<boolean>(false)

export const statusAtom = atom<"assigned" | "returned">("assigned")

export const returnedAtoms = atom<boolean>(false)