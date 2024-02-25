"use client"

import * as React from "react"
import {useRouter} from "next/navigation"

import {cn} from "@/lib/utils"
import {ButtonProps, buttonVariants} from "@/components/ui/button"
import {toast} from "@/components/ui/use-toast"
import {Icons} from "@/components/icons"

interface PostCreateButtonProps extends ButtonProps {}

export function ExamCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/exams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Exam",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {

      return toast({
        title: "Something went wrong.",
        description: "Your exam was not created. Please try again.",
        variant: "destructive",
      })
    }

    const post = await response.json()

    // This forces a cache invalidation.
    router.refresh()
    router.push(`/editor/${post.id}/`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      Start exam
    </button>
  )
}
