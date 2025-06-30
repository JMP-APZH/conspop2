/*
  Warnings:

  - You are about to drop the column `voterId` on the `Vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,ideaId,sessionId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `VotingSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "voterId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ideaId" TEXT,
ADD COLUMN     "method" TEXT NOT NULL DEFAULT 'SCORE',
ADD COLUMN     "rank" INTEGER,
ADD COLUMN     "score" INTEGER,
ADD COLUMN     "userEmail" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "scores" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VotingSession" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "maxPriorities" SET DEFAULT 15;

-- CreateIndex
CREATE INDEX "Vote_userId_idx" ON "Vote"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_ideaId_sessionId_key" ON "Vote"("userId", "ideaId", "sessionId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE SET NULL ON UPDATE CASCADE;
