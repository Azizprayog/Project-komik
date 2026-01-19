/*
  Warnings:

  - You are about to drop the column `description` on the `Comic` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Comic` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Comic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comic` DROP COLUMN `description`,
    DROP COLUMN `status`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
