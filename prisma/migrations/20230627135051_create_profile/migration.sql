-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- CreateTable
CREATE TABLE `DeveloperProfile` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `bio` TEXT NOT NULL,
    `education` VARCHAR(191) NULL,
    `repoUrl` VARCHAR(191) NULL,
    `personalSiteUrl` VARCHAR(191) NULL,

    INDEX `DeveloperProfile_profileId_idx`(`profileId`),
    UNIQUE INDEX `DeveloperProfile_profileId_key`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    INDEX `Profile_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `developerId` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    INDEX `Project_developerId_idx`(`developerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecruiterProfile` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `companySize` VARCHAR(191) NOT NULL,
    `companyIndustry` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,

    INDEX `RecruiterProfile_profileId_idx`(`profileId`),
    UNIQUE INDEX `RecruiterProfile_profileId_key`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- RenameIndex
ALTER TABLE `Account` RENAME INDEX `Account_userId_fkey` TO `Account_userId_idx`;

-- RenameIndex
ALTER TABLE `Session` RENAME INDEX `Session_userId_fkey` TO `Session_userId_idx`;
