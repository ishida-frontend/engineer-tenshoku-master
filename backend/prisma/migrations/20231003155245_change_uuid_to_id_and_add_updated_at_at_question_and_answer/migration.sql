/*
  Warnings:

  - Added the required column `updated_at` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Answer` ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
