"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import * as React from "react";

export default function HomeButton() {

    const router = useRouter()
    async function onClick() {
        router.refresh()

        router.push(`/dashboard`)
    }

    return <Button onClick={onClick}>
        Home
    </Button>

}