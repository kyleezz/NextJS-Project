import Link from "next/link"
import {Exam} from "@prisma/client"

import {formatDate} from "@/lib/utils"
import {Skeleton} from "@/components/ui/skeleton"
import {ExamOperations} from "@/components/exam-operations"

interface ExamItemProps {
    exam: Pick<Exam, "id" | "title" | "published" | "createdAt">
}

export function ExamItem({ exam }: ExamItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${exam.id}/`}
          className="font-semibold hover:underline"
        >
          {exam.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(exam.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <ExamOperations exam={{ id: exam.id, title: exam.title }} />
    </div>
  )
}

ExamItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
