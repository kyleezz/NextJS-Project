/*
  Warnings:

  - You are about to drop the column `examId` on the `responses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `responses` table. All the data in the column will be lost.
  - Added the required column `respondeeId` to the `responses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_examId_fkey";

-- AlterTable
ALTER TABLE "responses" DROP COLUMN "examId",
DROP COLUMN "userId",
ADD COLUMN     "respondeeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_respondeeId_fkey" FOREIGN KEY ("respondeeId") REFERENCES "respondee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
