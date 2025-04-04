/*
  Warnings:

  - You are about to drop the `FeaturedMediaExternalVideo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeaturedMediaImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeaturedMediaVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeaturedMediaExternalVideo" DROP CONSTRAINT "FeaturedMediaExternalVideo_productFeatureMediaId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturedMediaImage" DROP CONSTRAINT "FeaturedMediaImage_productFeatureMediaId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturedMediaVideo" DROP CONSTRAINT "FeaturedMediaVideo_productFeaturedMediaId_fkey";

-- DropTable
DROP TABLE "FeaturedMediaExternalVideo";

-- DropTable
DROP TABLE "FeaturedMediaImage";

-- DropTable
DROP TABLE "FeaturedMediaVideo";

-- CreateTable
CREATE TABLE "featured_media_video" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productFeaturedMediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "featured_media_video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_media_external_video" (
    "id" TEXT NOT NULL,
    "originUrl" TEXT NOT NULL,
    "productFeatureMediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "featured_media_external_video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_media_image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productFeatureMediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "featured_media_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant_product" (
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "onlineStoreUrl" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_variant_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant" (
    "id" TEXT NOT NULL,
    "shopifyId" TEXT NOT NULL,
    "title" TEXT,
    "productId" TEXT,
    "productVariantProductId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_variant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "featured_media_video_productFeaturedMediaId_key" ON "featured_media_video"("productFeaturedMediaId");

-- CreateIndex
CREATE UNIQUE INDEX "featured_media_external_video_productFeatureMediaId_key" ON "featured_media_external_video"("productFeatureMediaId");

-- CreateIndex
CREATE UNIQUE INDEX "featured_media_image_productFeatureMediaId_key" ON "featured_media_image"("productFeatureMediaId");

-- CreateIndex
CREATE UNIQUE INDEX "product_variant_product_productVariantId_key" ON "product_variant_product"("productVariantId");

-- AddForeignKey
ALTER TABLE "featured_media_video" ADD CONSTRAINT "featured_media_video_productFeaturedMediaId_fkey" FOREIGN KEY ("productFeaturedMediaId") REFERENCES "product_featured_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_media_external_video" ADD CONSTRAINT "featured_media_external_video_productFeatureMediaId_fkey" FOREIGN KEY ("productFeatureMediaId") REFERENCES "product_featured_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_media_image" ADD CONSTRAINT "featured_media_image_productFeatureMediaId_fkey" FOREIGN KEY ("productFeatureMediaId") REFERENCES "product_featured_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_product" ADD CONSTRAINT "product_variant_product_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
