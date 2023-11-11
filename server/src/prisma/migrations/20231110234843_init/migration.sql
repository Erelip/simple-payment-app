-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `item_cart_id_fkey`;

-- AlterTable
ALTER TABLE `item` MODIFY `cart_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
