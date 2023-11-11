/*
  Warnings:

  - A unique constraint covering the columns `[product_id,order_id]` on the table `item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `item_product_id_order_id_key` ON `item`(`product_id`, `order_id`);
