"use client"

import {useRouter} from 'next/navigation'
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonHeader(){
    return (
        <div className={"sticky text-xl top-0 z-50 bg-foreground text-white flex items-center p-4 px-8 justify-between"}>

            <Skeleton className="h-7" >
                {/*<div className={"flex items-center"}>*/}
                {/*    <p className={"hover:cursor-pointer w-5"}>asdfasdf</p>*/}
                {/*</div>*/}
            </Skeleton>
        </div>
    )
}