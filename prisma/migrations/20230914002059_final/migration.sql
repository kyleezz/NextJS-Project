/*
  Warnings:

  - You are about to drop the `questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `responses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_examId_fkey";

-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_respondeeId_fkey";

-- DropTable
DROP TABLE "questions";

-- DropTable
DROP TABLE "responses";
