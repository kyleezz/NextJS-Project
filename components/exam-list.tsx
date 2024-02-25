"use client"

import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import * as React from "react";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {useAtom} from "jotai";
import {statusAtom} from "@/lib/atoms";

export default function ExamList({userId}) {

    const [status, ] = useAtom(statusAtom)
    const router = useRouter()

    const settingsData = useQuery({
        queryKey: ["respondees"],
        queryFn: async () => {
            const res = await fetch(`/api/respondees/`)
            const data = await res.json()
            return data
        },
        suspense: true,
        refetchInterval: 10000,
    })

    // console.log(settingsData.data)

    const authorInfo = settingsData.data.authorInfo
    const title = settingsData.data.title
    const examIds = settingsData.data.examIds
    const respondeeInfo = settingsData.data.respondee

    const now = new Date()

    const parsedTitle = title.map((item, index) => {
        // console.log(new Date(respondeeInfo[index].startTime).getTime())
        // console.log(new Date(respondeeInfo[index].startTime).getTime() + 1000 * 60 * (parseInt(title[index].workingTime) + parseInt(title[index].readingTime)))
        // console.log(now.getTime())
        if (status === "assigned") {
            if (!respondeeInfo[index].startTime || new Date(respondeeInfo[index].startTime).getTime() + 1000 * 60 * (parseInt(title[index].workingTime) + parseInt(title[index].readingTime)) >= now.getTime()) {
                return (<div key={index}>
                        <div className="flex items-center justify-between space-x-4">
                            <Button className={"w-full h-full"} variant={"ghost"} onClick={() => {
                                // console.log("bruh")
                                router.push(`/exam/${examIds[index].examId}/`)
                            }}>
                                <div className="flex flex-row w-full items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src={authorInfo[index].image}/>
                                        <AvatarFallback>OM</AvatarFallback>
                                    </Avatar>
                                    <div className={"flex-grow"}>
                                        <p className="text-sm font-medium leading-none">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">{authorInfo[index].name}</p>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                )
            }
        } else {
            if (respondeeInfo[index].returned) {
                return (<div key={index}>
                        <div className="flex items-center justify-between space-x-4">
                            <Button className={"w-full h-full"} variant={"ghost"} onClick={() => {
                                // console.log("bruh")
                                router.push(`/return/${examIds[index].examId}/${userId}`)
                            }}>
                                <div className="flex flex-row w-full items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src={authorInfo[index].image}/>
                                        <AvatarFallback>OM</AvatarFallback>
                                    </Avatar>
                                    <div className={"flex-grow"}>
                                        <p className="text-sm font-medium leading-none">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">{authorInfo[index].name}</p>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                )
            }
        }
    })

    const cleanedData = parsedTitle.filter(Boolean);

    const finalData = cleanedData.map((item, index) => {
        if (index == cleanedData.length - 1) {
            return item;
        } else {
            return (
            <>
                {
                    item
                }
                <Separator className="my-4"/>
            </>
        )
        }
    })

    return (
        <ScrollArea className={"rounded-md border"}>
            <div className="p-6">

                { finalData.length == 0 ? "No current exams" :
                    finalData.map((item, index) => {
                        // console.log(new Date(respondeeInfo[index].startTime).getTime())
                        // console.log(new Date(respondeeInfo[index].startTime).getTime() + 1000 * 60 * (parseInt(title[index].workingTime) + parseInt(title[index].readingTime)))
                        // console.log(now.getTime())
                        return item
                    })
                }
            </div>
        </ScrollArea>
    )
}