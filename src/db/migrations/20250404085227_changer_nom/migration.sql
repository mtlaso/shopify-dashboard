/*
  Warnings:

  - You are about to drop the column `originUrl` on the `featured_media_external_video` table. All the data in the column will be lost.
  - Added the required column `url` to the `featured_media_external_video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "featured_media_external_video" DROP COLUMN "originUrl",
ADD COLUMN     "url" TEXT NOT NULL;
