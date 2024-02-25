/*
  Warnings:

  - You are about to drop the column `questions` on the `questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "questions",
ADD COLUMN     "data" TEXT NOT NULL DEFAULT '"questions": "[]"';
