/*
  Warnings:

  - Added the required column `order` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section_id` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Video` ADD COLUMN `order` INTEGER NOT NULL,
    ADD COLUMN `section_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `Section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
