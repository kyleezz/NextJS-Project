/*
  Warnings:

  - You are about to drop the column `startTime` on the `respondee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "respondee" DROP COLUMN "startTime",
ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
