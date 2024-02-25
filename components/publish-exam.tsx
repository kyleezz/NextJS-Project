import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Switch} from "@/components/ui/switch";
import {toast} from "@/components/ui/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Icons} from "@/components/icons";
import * as React from "react";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {promptsAtoms, publishedAtoms} from "@/lib/atoms";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {revalidatePath} from "next/cache";
import {useRouter} from "next/navigation";

const notificationsFormSchema = z.object({
    published: z.boolean().default(false),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

const defaultValues: Partial<NotificationsFormValues> = {
    published: false,
}

const queryClient = new QueryClient()

export default function PublishExam({examId}) {

    const [allPrompts, setAllPrompts] = useAtom(promptsAtoms)
    const [showTrueAlert, setShowTrueAlert] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [published, setPublished] = useAtom(publishedAtoms)
    const queryClient = useQueryClient()

    const router = useRouter()

    const form = useForm<NotificationsFormValues>({
        resolver: zodResolver(notificationsFormSchema),
        defaultValues,
    })

    useEffect(() => {
        form.setValue('published', published)
    }, [published]);

    function onSubmit(value) {
        if (value === true) {
            if (allPrompts.length === 0) {
                setTimeout(() => {form.setValue('published', false)}, 100)

                return toast({
                    title: "Something went wrong.",
                    description: "You need at least one question in your exam.",
                    variant: "destructive",
                })
            }

            setShowTrueAlert(true)
        } else {
            setShowDeleteAlert(true)
        }

        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //   <code className="text-white">{JSON.stringify({published: value}, null, 2)}</code>
        // </pre>
        //     ),
        // })


    }

    return (
        <>
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="published"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Published Status
                                        </FormLabel>
                                        <FormDescription>
                                            Publish the exam to add users to it. Once the exam is published, it cannot be edited anymore.
                                        </FormDescription>
                                    </div>
                                    {allPrompts.length === 0 ?
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <FormControl>
                                                    <Switch disabled={true} onClick={() => {onSubmit(!form.getValues('published'))}}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </HoverCardTrigger>
                                            <HoverCardContent>
                                                You must have at least one question to publish the exam.
                                            </HoverCardContent>
                                        </HoverCard>
                                        :
                                        <FormControl>
                                            <Switch onClick={() => {onSubmit(!form.getValues('published'))}}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    }
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>


        <AlertDialog
            open={showTrueAlert} onOpenChange={setShowTrueAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to publish this exam?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You will no longer be able to edit the exam.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => {
                        form.setValue('published', !form.getValues('published'))
                    }}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={ async () => {
                            await axios.patch(`/api/exams/${examId}/published`, {published: true})
                            setPublished(true)
                        }}
                        className="bg-primary"
                    >
                        {(
                            <Icons.publish className="mr-2 h-4 w-4"/>
                        )}
                        <span>Publish</span>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
            open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to set this exam to private?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        All current user responses will be deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => {
                        form.setValue('published', !form.getValues('published'))
                    }}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={ async () => {
                            await axios.patch(`/api/exams/${examId}/published`, {published: false})
                            queryClient.invalidateQueries(["examUsers"])
                            router.refresh()
                            setPublished(false)
                        }}
                        className="bg-red-600"
                    >
                        {(
                            <Icons.publish className="mr-2 h-4 w-4"/>
                        )}
                        <span>Remove</span>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
    )
}