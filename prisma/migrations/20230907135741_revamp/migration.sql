-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_examId_fkey";

-- CreateTable
CREATE TABLE "respondee" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "examId" TEXT NOT NULL,

    CONSTRAINT "respondee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "respondee" ADD CONSTRAINT "respondee_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_examId_fkey" FOREIGN KEY ("examId") REFERENCES "respondee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
