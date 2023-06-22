-- AlterTable
ALTER TABLE `Location` ADD COLUMN `remote` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `province` VARCHAR(191) NULL;
