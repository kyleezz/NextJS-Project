"use client"

import {Separator} from "@/components/ui/separator"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import UserList from "@/components/UserList";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {revalidatePath} from "next/cache";

async function checkIfEmailIsValid(email) {

    if (email.length < 1) return false;

    const res = await fetch(`/api/users/email/${email}`)
    const data = await res.json()
    return (data != null)
}

const accountFormSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: "Email must be at least 1 character.",
        }).email("This is not a valid email.")
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export default function CreateUserManagement({examId}) {

    const queryClient = useQueryClient()

    const defaultValues: Partial<AccountFormValues> = {
        email: ""
    }

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues
    })
    const router = useRouter()

    const updateUsersMutation = useMutation({
        mutationFn: (data: {}) => {
            return axios.post(`/api/exams/${examId}/users`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["examUsers"])
            router.refresh()
        },
        onError: () => {
            return toast({
                title: "Something went wrong.",
                description: "The user was not added. Please try again.",
                variant: "destructive",
                duration: 1000,
            })
        }
    })
    async function onSubmit(data: AccountFormValues) {
        form.reset(defaultValues)

        const valid = await checkIfEmailIsValid(data.email)

        if (!valid) {
            return toast({
                title: "Something went wrong.",
                description: "The specified user does not exist.",
                variant: "destructive",
                duration: 1000
            })
        }

        updateUsersMutation.mutate(data)
    }

    const usersData = useQuery({
        queryKey: ["examUsers"],
        queryFn: async () => {
            const data = await axios.get(`/api/exams/${examId}/users`)
            return data.data
        },
        refetchInterval: 10000,
        suspense: true
    })

    // console.log(usersData.data.startedData)

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">User Accounts</h3>
            </div>
            <Separator />
            <div className="flex space-x-2">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-row gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className={"flex-grow"}>
                                    <FormLabel>User Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the email of the user that you would like to add to the exam.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button variant="secondary" className="shrink-0">
                            Add User
                        </Button>
                    </form>
                </Form>
            </div>
            <Separator />
            {usersData.isLoading ? null : <UserList examId={examId} examUsers={usersData.data.data} startedData={usersData.data.startedData} readingTime={usersData.data.readingTime} workingTime={usersData.data.workingTime} />}


            {/*<AccountForm />*/}
        </div>
    )
}