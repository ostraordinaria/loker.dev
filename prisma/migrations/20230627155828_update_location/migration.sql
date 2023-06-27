/*
  Warnings:

  - You are about to drop the column `location` on the `RecruiterProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DeveloperProfile` ADD COLUMN `locationId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `RecruiterProfile` DROP COLUMN `location`,
    ADD COLUMN `locationId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `DeveloperProfile_locationId_idx` ON `DeveloperProfile`(`locationId`);

-- CreateIndex
CREATE INDEX `RecruiterProfile_locationId_idx` ON `RecruiterProfile`(`locationId`);
