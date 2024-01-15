-- CreateTable
CREATE TABLE `GoodVideo` (
    `user_id` VARCHAR(255) NOT NULL,
    `video_id` VARCHAR(255) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `GoodVideo_user_id_video_id_key`(`user_id`, `video_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
