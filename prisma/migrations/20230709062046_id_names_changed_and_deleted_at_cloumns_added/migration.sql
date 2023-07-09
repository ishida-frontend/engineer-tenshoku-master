/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `Course` table. All the data in the column will be lost.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `video_id` on the `Video` table. All the data in the column will be lost.
  - Added the required column `id` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` DROP PRIMARY KEY,
    DROP COLUMN `category_id`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Video` DROP PRIMARY KEY,
    DROP COLUMN `video_id`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
