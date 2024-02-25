"use client"

import {useRouter} from 'next/navigation'
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Link from "next/link";

const fetcher = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export default function CreateHeader({exam = false, examId}){
    const [title, setTitle] = useState("")

    const router = useRouter();

    const settingsData = useQuery({
        queryKey: ["settings"],
        queryFn: async () => {
            const a = await new Promise((sus) => setTimeout(sus, 2000))
            const res = await fetch(`/api/exams/${examId}`)
            const data = await res.json()
            return data
        },
        suspense: true,
    })
    //
    // useEffect(() => {
    //     if (settingsData.data) {
    //         setTitle(settingsData.data.title)
    //     }
    // }, [settingsData]);

    if (settingsData.isLoading) {
        return (
            <div className={"sticky text-xl top-0 z-100 bg-foreground text-white flex items-center p-4 px-8 justify-between"}>
                <div className={"flex items-center"}>
                    <Link href={'/dashboard'}>Loading...</Link>
                </div>
            </div>
        )
    }

    return (
        <div className={"sticky text-xl top-0 z-50 bg-foreground text-white flex items-center p-4 px-8 justify-between"}>
            <div className={"flex items-center"}>
                <Link href={'/dashboard'}>{settingsData.data.title}</Link>
            </div>
        </div>
    )
}