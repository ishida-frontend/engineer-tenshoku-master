-- AlterTable
ALTER TABLE `Course` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Section` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `order` INTEGER NULL;

-- AlterTable
ALTER TABLE `Video` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;
