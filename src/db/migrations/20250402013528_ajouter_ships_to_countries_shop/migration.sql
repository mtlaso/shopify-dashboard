/*
  Warnings:

  - You are about to drop the column `chipsToCountries` on the `shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shop" DROP COLUMN "chipsToCountries",
ADD COLUMN     "shipsToCountries" TEXT[];
