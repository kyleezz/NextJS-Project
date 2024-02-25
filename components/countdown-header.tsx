"use client"

import {useEffect, useState} from "react";
import {useRouter} from 'next/navigation'
import {useAtom} from "jotai/index";
import {endedAtoms, workingAtoms} from "@/lib/atoms";

export default function CountdownHeader({respondee, settings, examId}){

    respondee.startTime = new Date(respondee.startTime)

    const router = useRouter();
    let [readingCounter, setReadingCounter] = useState("00:00:00");
    let [workingCounter, setWorkingCounter] = useState("00:00:00");

    const [loaded, setLoaded] = useState(false)
    const [work, setWork] = useAtom(workingAtoms);
    const [ended, setEnded] = useAtom(endedAtoms);

    const changeToWorking = () => {
        setWork(true)
        // router.refresh()
    };

    let getReadingCounter = () => {
        let all = respondee.startTime.getTime() + settings.readingTime * 60 * 1000 - (new Date()).getTime();
        let s = Math.floor((all / 1000) % 60);
        let m = Math.floor((all / 1000 / 60) % 60);
        let h = Math.floor((all / 1000 / 60 / 60) % 24);

        return {
            all,
            s,
            m,
            h,
        };
    };

    let initReadingCounter = () => {
        let { all, h, m, s } = getReadingCounter();


        if (s % 5 === 0) {
            router.refresh()
        }

        if (all >= 0) {
            setReadingCounter(
                (h > 9 ? h : "0" + h) +
                ":" +
                (m > 9 ? m : "0" + m) +
                ":" +
                (s > 9 ? s : "0" + s),
            );
            setLoaded(true)
        } else {
            clearTimeout(timer)
            changeToWorking()
        }
    };

    let getWorkingCounter = () => {
        let all = respondee.startTime.getTime() + (settings.readingTime + settings.workingTime) * 60 * 1000 - (new Date()).getTime();
        let s = Math.floor((all / 1000) % 60);
        let m = Math.floor((all / 1000 / 60) % 60);
        let h = Math.floor((all / 1000 / 60 / 60) % 24);
        return {
            all,
            s,
            m,
            h,
        };
    };

    let initWorkingCounter = () => {
        let { all, h, m, s } = getWorkingCounter();

        if (s % 5 === 0) {
            router.refresh()
        }

        if (all >= 0) {
            setWorkingCounter(
                (h > 9 ? h : "0" + h) +
                ":" +
                (m > 9 ? m : "0" + m) +
                ":" +
                (s > 9 ? s : "0" + s),
            );
            setLoaded(true)
        } else {
            clearTimeout(timer2)
            setWork(false)
            setEnded(true)
            setTimeout(() => {
                router.refresh()
                router.replace(`/end`)
                router.refresh()
            }, 2000)

        }
    };

    let timer, timer2
    useEffect(() => {
        timer = setInterval(() => {
            initReadingCounter()
        }, 1000)
        timer2 = setInterval(() => {
            initWorkingCounter()
        }, 1000)

        return () => {clearTimeout(timer); clearTimeout(timer2)}
    }, [])


    return (
        <div className={"sticky text-xl top-0 z-50 bg-foreground text-white flex items-center p-4 px-8 justify-between"}>

            <div className={"flex items-center"}>
                <p>{settings.title}</p>
            </div>


            <div className={"flex items-center sm:space-x-2 justify-end"}>
                {
                    work ? "Working Time: " + workingCounter : "Reading Time: " + readingCounter
                }
            </div>
        </div>
    )
}