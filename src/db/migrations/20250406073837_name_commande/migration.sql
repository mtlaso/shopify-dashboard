/*
  Warnings:

  - You are about to drop the column `name` on the `order_price` table. All the data in the column will be lost.
  - Added the required column `name` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_price" DROP COLUMN "name";
