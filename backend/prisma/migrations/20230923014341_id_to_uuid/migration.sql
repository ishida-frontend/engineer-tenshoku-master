/*
  Warnings:

  - The primary key for the `Contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Section` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Section` DROP FOREIGN KEY `Section_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `Video` DROP FOREIGN KEY `Video_section_id_fkey`;

-- AlterTable
ALTER TABLE `Contact` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`(100));

-- AlterTable
ALTER TABLE `Course` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Section` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(255) NOT NULL,
    MODIFY `course_id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Video` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(255) NOT NULL,
    MODIFY `section_id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `Section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
