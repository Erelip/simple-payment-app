/*
  Warnings:

  - A unique constraint covering the columns `[products_id]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Cart_products_id_key` ON `Cart`(`products_id`);
