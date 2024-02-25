import {useRef} from "react";
import {TextareaAutosize} from '@mui/base';


// const { TextArea } = Input;

export default function Question({ value, onChange, disabled }) {

    const ref = useRef();
    let sending = 0;

    return (
        <>
            <TextareaAutosize disabled={!!disabled} value={value} onChange={(e) => {onChange(e)}} className={"border-0 outline-0 resize-none bg-neutral-200 font-bold text-black text-xl flex-grow font-sans"}  placeholder={"Question…"}/>
        </>
    )
}