/*
  Warnings:

  - You are about to drop the column `icon` on the `Course` table. All the data in the column will be lost.
  - Made the column `name` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `icon`,
    MODIFY `name` VARCHAR(191) NOT NULL;
