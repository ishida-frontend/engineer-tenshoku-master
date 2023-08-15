/*
  Warnings:

  - You are about to drop the column `order` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `section_id` on the `Video` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Video` DROP FOREIGN KEY `Video_section_id_fkey`;

-- AlterTable
ALTER TABLE `Video` DROP COLUMN `order`,
    DROP COLUMN `section_id`;
