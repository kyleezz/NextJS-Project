"use client"

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import * as React from "react";
import {useAtom} from "jotai";
import {statusAtom} from "@/lib/atoms";

export default function SelectStatus() {

    const [status, setStatus] = useAtom(statusAtom)

    return (
        <Select value={status} onValueChange={(e) => {
            if (e === "assigned" || e === "returned") setStatus(e)
        }}>
            <SelectTrigger className="w-[180px] ml-auto">
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
            </SelectContent>
        </Select>
    )
}