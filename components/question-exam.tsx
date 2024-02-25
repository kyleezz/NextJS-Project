import {TextareaAutosize} from '@mui/base';


// const { TextArea } = Input;

export default function QuestionExam({ value, disabled }) {

    return (
        <>
            <TextareaAutosize disabled={!!disabled} value={value} className={"border-0 outline-0 resize-none bg-neutral-200 font-bold text-black text-xl flex-grow font-sans"}  placeholder={"Question…"}/>
        </>
    )
}