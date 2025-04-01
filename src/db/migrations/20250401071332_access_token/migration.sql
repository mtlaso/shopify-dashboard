/*
  Warnings:

  - Added the required column `accessToken` to the `shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shop" ADD COLUMN     "accessToken" TEXT NOT NULL;
