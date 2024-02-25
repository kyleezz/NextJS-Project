/*
  Warnings:

  - Added the required column `userId` to the `respondees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "respondees" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "responses" (
    "id" TEXT NOT NULL,
    "respondeeId" TEXT NOT NULL,
    "questionIndex" INTEGER NOT NULL,
    "partIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "responses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_respondeeId_fkey" FOREIGN KEY ("respondeeId") REFERENCES "respondees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
