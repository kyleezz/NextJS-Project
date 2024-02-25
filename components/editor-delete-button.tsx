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
import {deletePage, pageNumber, promptsAtoms} from "@/lib/atoms";
import {useAtom} from "jotai";

export default function EditorDeleteButton({examId}) {
    const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
    const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
    const router = useRouter()
    const [page, setPage] = useAtom(pageNumber)
    const [, deleteQuestion] = useAtom(deletePage)
    const [allPrompts, setAllPrompts] = useAtom(promptsAtoms)

    return (
        <>
            <Button className={"ml-auto"} onClick={() => setShowDeleteAlert(true)}>Delete</Button>
            <AlertDialog
                open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to delete this post?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={ () => {
                                deleteQuestion(page)

                                if (page === allPrompts.length) {
                                    setPage(page - 1)
                                }
                            }}
                            className="bg-red-600 focus:ring-red-600"
                        >
                            {isDeleteLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            ) : (
                                <Icons.trash className="mr-2 h-4 w-4"/>
                            )}
                            <span>Delete</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
