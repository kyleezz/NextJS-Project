import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Icons} from "@/components/icons";
import {revalidatePath} from "next/cache";

// async function deleteUser(userId: string, examId: string) {
//     const response = await fetch(`/api/respondees/${userId}/${examId}`, {
//         method: "DELETE",
//     })
//
//     if (!response?.ok) {
//         toast({
//             title: "Something went wrong.",
//             description: "Your post was not deleted. Please try again.",
//             variant: "destructive",
//         })
//     }
//
//     return true
// }
export default function UserList({examUsers, examId, startedData, readingTime, workingTime}) {

    const [users, setUsers] = useState(examUsers)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)

    useEffect(() => {
        setUsers(examUsers)
    }, [examUsers]);

    const router = useRouter()
    const queryClient = useQueryClient()

    const deleteUserMutation = useMutation({
        mutationFn: (data: {userId: string}) => {
            return axios.delete(`/api/exams/${examId}/users/${data.userId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["examUsers"])
            router.refresh()
        },
        onError: () => {
            return toast({
                title: "Something went wrong.",
                description: "The user was not deleted. Please try again.",
                variant: "destructive",
                duration: 1000,
            })
        }
    })

    const now = new Date()

    // console.log(new Date(startedData[0].startTime).getTime()  +  1000 * 60 * (parseInt(workingTime) + parseInt(readingTime)) )
    // console.log(now.getTime())

    return (
        <ScrollArea className={"rounded-md border"}>
            <div className="p-6">

                { users.length == 0 ? "Start by adding some users" :
                    users.map((item, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between space-x-4">
                                <Button disabled={!startedData[index]?.startTime} className={"w-full h-full"} variant={"ghost"} onClick={() => {
                                    // console.log("bruh")
                                    router.push(`/review/${examId}/${item.id}`)
                                }}>
                                    <div className="flex flex-row w-full items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage src={item.image} />
                                            <AvatarFallback>OM</AvatarFallback>
                                        </Avatar>
                                        <div className={"flex-grow"}>
                                            <p className="text-sm font-medium leading-none">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">{item.email}</p>
                                        </div>
                                    </div>

                                </Button>

                                <span className="mr-2 rounded-lg bg-primary px-2 py-2 text-xs text-primary-foreground whitespace-nowrap">
                                  {startedData[index]?.startTime ? now.getTime() >= new Date(startedData[index]?.startTime).getTime() +  1000 * 60 * (workingTime + readingTime) ? startedData[index]?.returned ? "Returned" : "Finished" : "Started" : "Not Started"}
                                </span>

                                <Button className={"ml-auto bg-red-600 focus:ring-red-600"} onClick={() => setShowDeleteAlert(true)}>Delete</Button>
                                <AlertDialog
                                    open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you sure you want to delete this user's response?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={ () => {
                                                    const data = {userId: item.id}
                                                    deleteUserMutation.mutate(data)
                                                }}
                                                className="bg-red-600 focus:ring-red-600"
                                            >
                                                {(
                                                    <Icons.trash className="mr-2 h-4 w-4"/>
                                                )}
                                                <span>Delete</span>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </div>
                            {
                                index === examUsers.length - 1 ? null : <Separator className="my-4" />
                            }
                        </div>
                    ))
                }
            </div>
        </ScrollArea>
    )
}
