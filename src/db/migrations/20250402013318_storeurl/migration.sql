/*
  Warnings:

  - You are about to drop the column `onlineStoreUrl` on the `shop` table. All the data in the column will be lost.
  - Added the required column `onlineStoreUrl` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "onlineStoreUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "shop" DROP COLUMN "onlineStoreUrl";
