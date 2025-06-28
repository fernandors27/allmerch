-- CreateTable
CREATE TABLE `users` (
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `address` TEXT NULL,
    `role` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `token` VARCHAR(255) NOT NULL,
    `email_user` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `merchandises` (
    `id` VARCHAR(50) NOT NULL,
    `id_category` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `stock` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `merchandise_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_merchandise` VARCHAR(50) NOT NULL,
    `detail` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `charts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email_user` VARCHAR(100) NOT NULL,
    `id_merchandise` VARCHAR(50) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `packing_cost` INTEGER NOT NULL,
    `shipping_cost` INTEGER NOT NULL,
    `total_cost` INTEGER NOT NULL,
    `status` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_email_user_fkey` FOREIGN KEY (`email_user`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `merchandises` ADD CONSTRAINT `merchandises_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `merchandise_details` ADD CONSTRAINT `merchandise_details_id_merchandise_fkey` FOREIGN KEY (`id_merchandise`) REFERENCES `merchandises`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `charts` ADD CONSTRAINT `charts_email_user_fkey` FOREIGN KEY (`email_user`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `charts` ADD CONSTRAINT `charts_id_merchandise_fkey` FOREIGN KEY (`id_merchandise`) REFERENCES `merchandises`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
