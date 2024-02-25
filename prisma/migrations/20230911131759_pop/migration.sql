-- AlterTable
ALTER TABLE "exams" ADD COLUMN     "prompts" TEXT[] DEFAULT ARRAY[]::TEXT[];
