/*
  Warnings:

  - You are about to drop the column `content` on the `exams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exams" DROP COLUMN "content",
ADD COLUMN     "settings" JSONB NOT NULL DEFAULT '{"asdf": " asdf"}';

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "content" JSONB NOT NULL DEFAULT '{"data": ""}',
    "examId" TEXT NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
