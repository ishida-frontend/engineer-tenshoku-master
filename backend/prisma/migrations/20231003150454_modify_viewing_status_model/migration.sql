/*
  Warnings:

  - A unique constraint covering the columns `[status]` on the table `ViewingStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ViewingStatus_status_key` ON `ViewingStatus`(`status`);
