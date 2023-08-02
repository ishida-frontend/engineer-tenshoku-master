/*
  Warnings:

  - Added the required column `course_id` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Video` ADD COLUMN `course_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
