/*
  Warnings:

  - You are about to drop the column `settings` on the `exams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exams" DROP COLUMN "settings",
ADD COLUMN     "readingTime" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "workingTime" INTEGER NOT NULL DEFAULT 120;
