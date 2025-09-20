/*
  Warnings:

  - You are about to drop the `PostTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PostTag` DROP FOREIGN KEY `PostTag_postId_fkey`;

-- DropForeignKey
ALTER TABLE `PostTag` DROP FOREIGN KEY `PostTag_tagId_fkey`;

-- DropTable
DROP TABLE `PostTag`;

-- CreateTable
CREATE TABLE `_PostToTags` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostToTags_AB_unique`(`A`, `B`),
    INDEX `_PostToTags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PostToTags` ADD CONSTRAINT `_PostToTags_A_fkey` FOREIGN KEY (`A`) REFERENCES `Posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToTags` ADD CONSTRAINT `_PostToTags_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
