/*
  Warnings:

  - You are about to drop the column `course_id` on the `Section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Section` DROP FOREIGN KEY `Section_course_id_fkey`;

-- AlterTable
ALTER TABLE `Section` DROP COLUMN `course_id`;
