/*
  Warnings:

  - You are about to drop the `charts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `charts` DROP FOREIGN KEY `charts_email_user_fkey`;

-- DropForeignKey
ALTER TABLE `charts` DROP FOREIGN KEY `charts_id_merchandise_fkey`;

-- DropTable
DROP TABLE `charts`;

-- CreateTable
CREATE TABLE `chart_order` (
    `id` VARCHAR(191) NOT NULL,
    `email_user` VARCHAR(100) NOT NULL,
    `id_merchandise` VARCHAR(50) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `packing_cost` INTEGER NOT NULL,
    `shipping_cost` INTEGER NOT NULL,
    `total_cost` INTEGER NOT NULL,
    `status_payment` VARCHAR(50) NOT NULL,
    `status_order` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chart_order` ADD CONSTRAINT `chart_order_email_user_fkey` FOREIGN KEY (`email_user`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chart_order` ADD CONSTRAINT `chart_order_id_merchandise_fkey` FOREIGN KEY (`id_merchandise`) REFERENCES `merchandises`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
