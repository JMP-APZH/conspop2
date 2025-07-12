/*
  Warnings:

  - You are about to alter the column `userEmail` on the `Vote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "userName" VARCHAR(255),
ALTER COLUMN "userEmail" SET DATA TYPE VARCHAR(255);
