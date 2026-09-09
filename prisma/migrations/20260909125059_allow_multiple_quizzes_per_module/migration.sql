-- DropIndex
DROP INDEX "Quiz_moduleId_key";

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
