/*
  Warnings:

  - Added the required column `createdAt` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "store" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
