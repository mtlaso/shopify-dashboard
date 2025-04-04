/*
  Warnings:

  - You are about to drop the column `productFeatureMediaId` on the `featured_media_external_video` table. All the data in the column will be lost.
  - You are about to drop the column `productFeatureMediaId` on the `featured_media_image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productFeaturedMediaId]` on the table `featured_media_external_video` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productFeaturedMediaId]` on the table `featured_media_image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productFeaturedMediaId` to the `featured_media_external_video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productFeaturedMediaId` to the `featured_media_image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "featured_media_external_video" DROP CONSTRAINT "featured_media_external_video_productFeatureMediaId_fkey";

-- DropForeignKey
ALTER TABLE "featured_media_image" DROP CONSTRAINT "featured_media_image_productFeatureMediaId_fkey";

-- DropIndex
DROP INDEX "featured_media_external_video_productFeatureMediaId_key";

-- DropIndex
DROP INDEX "featured_media_image_productFeatureMediaId_key";

-- AlterTable
ALTER TABLE "featured_media_external_video" DROP COLUMN "productFeatureMediaId",
ADD COLUMN     "productFeaturedMediaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "featured_media_image" DROP COLUMN "productFeatureMediaId",
ADD COLUMN     "productFeaturedMediaId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "featured_media_external_video_productFeaturedMediaId_key" ON "featured_media_external_video"("productFeaturedMediaId");

-- CreateIndex
CREATE UNIQUE INDEX "featured_media_image_productFeaturedMediaId_key" ON "featured_media_image"("productFeaturedMediaId");

-- AddForeignKey
ALTER TABLE "featured_media_external_video" ADD CONSTRAINT "featured_media_external_video_productFeaturedMediaId_fkey" FOREIGN KEY ("productFeaturedMediaId") REFERENCES "product_featured_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_media_image" ADD CONSTRAINT "featured_media_image_productFeaturedMediaId_fkey" FOREIGN KEY ("productFeaturedMediaId") REFERENCES "product_featured_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
