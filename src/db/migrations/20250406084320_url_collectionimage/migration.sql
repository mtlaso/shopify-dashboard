/*
  Warnings:

  - Added the required column `url` to the `collection_image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collection_image" ADD COLUMN     "url" TEXT NOT NULL;
