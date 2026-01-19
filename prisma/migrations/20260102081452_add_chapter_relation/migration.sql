-- AlterTable
ALTER TABLE `Comic` MODIFY `lastChapter` INTEGER NULL;

-- CreateTable
CREATE TABLE `Chapter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `comicId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Chapter_comicId_number_key`(`comicId`, `number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_comicId_fkey` FOREIGN KEY (`comicId`) REFERENCES `Comic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
