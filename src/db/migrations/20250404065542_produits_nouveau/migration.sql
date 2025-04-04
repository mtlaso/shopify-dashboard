/*
  Warnings:

  - You are about to drop the `product_image` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MediaContentType" AS ENUM ('VIDEO', 'EXTERNAL_VIDEO', 'IMAGE', 'MODEL_3D');

-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_productId_fkey";

-- DropTable
DROP TABLE "product_image";

-- CreateTable
CREATE TABLE "FeaturedMediaVideo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productFeaturedMediaId" TEXT NOT NULL,

    CONSTRAINT "FeaturedMediaVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturedMediaExternalVideo" (
    "id" TEXT NOT NULL,
    "originUrl" TEXT NOT NULL,
    "productFeatureMediaId" TEXT NOT NULL,

    CONSTRAINT "FeaturedMediaExternalVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturedMediaImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productFeatureMediaId" TEXT NOT NULL,

    CONSTRAINT "FeaturedMediaImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_featured_media" (
    "id" TEXT NOT NULL,
    "shopifyId" TEXT NOT NULL,
    "alt" TEXT,
    "mediaContentType" "MediaContentType" NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "featuredMediaVideoId" TEXT,
    "featuredMediaExternalVideoId" TEXT,
    "featuredMediaImageId" TEXT,

    CONSTRAINT "product_featured_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedMediaVideo_productFeaturedMediaId_key" ON "FeaturedMediaVideo"("productFeaturedMediaId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedMediaExternalVideo_productFeatureMediaId_key" ON "FeaturedMediaExternalVideo"("productFeatureMediaId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedMediaImage_productFeatureMediaId_key" ON "FeaturedMediaImage"("productFeatureMediaId");

-- CreateIndex
CREATE UNIQUE INDEX "product_featured_media_productId_key" ON "product_featured_media"("productId");

-- AddForeignKey
ALTER TABLE "FeaturedMediaVideo" ADD CONSTRAINT "FeaturedMediaVideo_productFeaturedMediaId_fkey" FOREIGN KEY ("productFeaturedMediaId") REFERENCES "product_featured_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturedMediaExternalVideo" ADD CONSTRAINT "FeaturedMediaExternalVideo_productFeatureMediaId_fkey" FOREIGN KEY ("productFeatureMediaId") REFERENCES "product_featured_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturedMediaImage" ADD CONSTRAINT "FeaturedMediaImage_productFeatureMediaId_fkey" FOREIGN KEY ("productFeatureMediaId") REFERENCES "product_featured_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_featured_media" ADD CONSTRAINT "product_featured_media_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
