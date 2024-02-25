/*
  Warnings:

  - You are about to drop the column `content` on the `questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "content",
ADD COLUMN     "prompt" TEXT NOT NULL DEFAULT '';
