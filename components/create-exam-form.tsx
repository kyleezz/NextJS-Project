"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {toast} from "@/components/ui/use-toast"
import * as React from "react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Icons} from "@/components/icons";
import {useAtom} from "jotai/index";
import {titleAtoms} from "@/lib/atoms";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";


const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
] as const

const accountFormSchema = z.object({
    title: z
        .string()
        .min(1, {
            message: "Name must be at least 1 character.",
        })
        .max(100, {
            message: "Name must not be longer than 100 characters.",
        }),
    readingTime: z.coerce.number({
        required_error: "Reading time is required.",
    }).min(0, "Amount must be a positive number").max(3599, "Amount must not exceed 60 hours"),
    workingTime: z.coerce.number({
        required_error: "Working time is required.",
    }).min(1, "Amount must be a positive number").max(3599, "Amount must not exceed 60 hours"),
})

type AccountFormValues = z.infer<typeof accountFormSchema>



export default function CreateExamForm({examId}) {


    const router = useRouter()
    const queryClient = useQueryClient()

    const [title, setTitle] = useAtom(titleAtoms)
    const [isSaving, setIsSaving] = React.useState<boolean>(false)

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        // defaultValues: async() => {
        //     const response = await fetch(`/api/exams/${examId}/settings`);
        //     const data = response.json()
        //     return data
        // }
    })


    const settingsData = useQuery({
        queryKey: ["settings"],
        queryFn: async () => {
            const res = await fetch(`/api/exams/${examId}`)
            const data = await res.json()
            return data
        },
        suspense: true,
    })

    useEffect(() => {
        if (!settingsData.data) return;
        form.reset(settingsData.data)
    }, [settingsData.data]);

    const updateSettingsMutation = useMutation({
        mutationFn: (data: {}) => {
            return axios.patch(`/api/exams/${examId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["settings"])

            toast({
                description: "Your exam information has been updated.",
            })
        },
        onError: () => {
            return toast({
                title: "Something went wrong.",
                description: "The exam was not updated. Please try again.",
                variant: "destructive",
            })
        }
    })
    async function onSubmit(data: AccountFormValues) {
        updateSettingsMutation.mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    defaultValue={""}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Exam Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the title of the exam that will be displayed at the top of the webpage.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="readingTime"
                    defaultValue={10}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Reading Time (Minutes)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Reading time" {...field} min={0}/>
                            </FormControl>
                            <FormDescription>
                                The amount of reading time you would like to allocate.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="workingTime"
                    defaultValue={120}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Working Time (Minutes)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Working time" {...field} min={1} />
                            </FormControl>
                            <FormDescription>
                                The amount of working time you would like to allocate.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <button
                    type="submit"
                    className={cn(buttonVariants())}
                    disabled={isSaving}
                >
                    {isSaving && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                    )}
                    <span>Save</span>
                </button>
            </form>
        </Form>
    )
}