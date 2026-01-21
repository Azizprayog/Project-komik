/*
  Warnings:

  - Added the required column `title` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Comic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comic" ALTER COLUMN "title" SET NOT NULL;
