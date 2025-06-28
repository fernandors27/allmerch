/*
  Warnings:

  - The primary key for the `charts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `status` on the `charts` table. All the data in the column will be lost.
  - Added the required column `status_order` to the `charts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_payment` to the `charts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `charts` DROP PRIMARY KEY,
    DROP COLUMN `status`,
    ADD COLUMN `status_order` VARCHAR(50) NOT NULL,
    ADD COLUMN `status_payment` VARCHAR(50) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
