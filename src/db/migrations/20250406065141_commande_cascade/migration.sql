-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_shopId_fkey";

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
