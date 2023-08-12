-- CreateTable
CREATE TABLE `CourseTag` (
    `course_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    PRIMARY KEY (`course_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CourseTag` ADD CONSTRAINT `CourseTag_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseTag` ADD CONSTRAINT `CourseTag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
