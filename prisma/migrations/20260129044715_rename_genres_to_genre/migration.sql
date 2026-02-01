/*
  Warnings:

  - You are about to drop the column `genre` on the `Comic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comic" DROP COLUMN "genre",
ADD COLUMN     "genre" TEXT;
