-- DropForeignKey
ALTER TABLE "collection" DROP CONSTRAINT "collection_shopId_fkey";

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
