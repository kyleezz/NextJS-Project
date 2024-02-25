"use client"

import {useRouter} from 'next/navigation'
import Link from "next/link";
import {useAtom} from "jotai/index";
import {userAtoms} from "@/lib/atoms";

const fetcher = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export default function ReviewHeader({settings}){
    const router = useRouter();
    const [user, setUser] = useAtom(userAtoms)

    return (
        <div className={"sticky text-xl top-0 z-50 bg-foreground text-white flex items-center p-4 px-8 justify-between"}>
            <div className={"flex items-center"}>
                <Link href={'/dashboard'}>{settings.title} - {user.name}</Link>
            </div>
        </div>
    )
}