/*
  Warnings:

  - Added the required column `userId` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `service_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service_orders" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
