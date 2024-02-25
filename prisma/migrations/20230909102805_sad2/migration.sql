/*
  Warnings:

  - You are about to drop the `responses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "respondees" DROP CONSTRAINT "respondees_examId_fkey";

-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_respondeeId_fkey";

-- DropTable
DROP TABLE "responses";

-- AddForeignKey
ALTER TABLE "respondees" ADD CONSTRAINT "respondees_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
