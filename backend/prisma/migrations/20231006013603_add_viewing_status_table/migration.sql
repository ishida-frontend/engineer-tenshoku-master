-- CreateTable
CREATE TABLE `ViewingStatus` (
    `status` BOOLEAN NOT NULL DEFAULT false,
    `user_id` VARCHAR(255) NOT NULL,
    `video_id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ViewingStatus_user_id_video_id_key`(`user_id`, `video_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ViewingStatus` ADD CONSTRAINT `ViewingStatus_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViewingStatus` ADD CONSTRAINT `ViewingStatus_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
