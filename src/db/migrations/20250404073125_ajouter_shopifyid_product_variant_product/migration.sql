/*
  Warnings:

  - Added the required column `shopifyId` to the `product_variant_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_variant_product" ADD COLUMN     "shopifyId" TEXT NOT NULL;
