/*
  Warnings:

  - Added the required column `onlineStoreUrl` to the `shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shop" ADD COLUMN     "chipsToCountries" TEXT[],
ADD COLUMN     "description" TEXT,
ADD COLUMN     "onlineStoreUrl" TEXT NOT NULL;
