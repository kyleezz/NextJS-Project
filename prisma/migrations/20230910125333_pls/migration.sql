/*
  Warnings:

  - A unique constraint covering the columns `[userId,examId]` on the table `respondees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "respondees_userId_examId_key" ON "respondees"("userId", "examId");
