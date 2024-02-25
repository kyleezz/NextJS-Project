/*
  Warnings:

  - You are about to drop the `respondee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "respondee" DROP CONSTRAINT "respondee_examId_fkey";

-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_respondeeId_fkey";

-- DropTable
DROP TABLE "respondee";

-- CreateTable
CREATE TABLE "respondees" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "examId" TEXT NOT NULL,

    CONSTRAINT "respondees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "respondees" ADD CONSTRAINT "respondees_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_respondeeId_fkey" FOREIGN KEY ("respondeeId") REFERENCES "respondees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
