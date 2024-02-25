"use client"

import {Button} from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Icons} from "@/components/icons";
import * as React from "react";
import {useRouter} from "next/navigation";
import {deletePage, pageNumber, promptsAtoms, returnedAtoms} from "@/lib/atoms";
import {useAtom} from "jotai";

export default function TurninButton({examId, userId}) {
    const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
    const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
    const router = useRouter()
    const [page, setPage] = useAtom(pageNumber)
    const [, deleteQuestion] = useAtom(deletePage)
    const [allPrompts, setAllPrompts] = useAtom(promptsAtoms)
    const [returnedStatus, ] = useAtom(returnedAtoms)


    if (returnedStatus) {
        return <Button disabled={true} className={"ml-auto"} onClick={() => setShowDeleteAlert(true)}>Returned</Button>

    } else {
        return (
            <>
                <Button className={"ml-auto"} onClick={() => setShowDeleteAlert(true)}>Return</Button>
                <AlertDialog
                    open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure you want to return this student's response?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={async () => {
                                    const response = await fetch(`/api/respondees/${userId}/${examId}/returned`, {
                                        method: "PATCH",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            return: true
                                        }),
                                    })

                                    router.back()
                                }}
                                // className="bg-red-600 focus:ring-red-600"
                            >
                                {isDeleteLoading ? (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                ) : (
                                    <Icons.rotateccw className="mr-2 h-4 w-4"/>
                                )}
                                <span>Return</span>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>
        )
    }
}
