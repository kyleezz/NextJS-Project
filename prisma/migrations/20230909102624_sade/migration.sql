-- DropForeignKey
ALTER TABLE "respondees" DROP CONSTRAINT "respondees_examId_fkey";

-- AddForeignKey
ALTER TABLE "respondees" ADD CONSTRAINT "respondees_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
