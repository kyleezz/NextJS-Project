-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_examId_fkey";

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
