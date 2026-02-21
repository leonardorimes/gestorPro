/*
  Warnings:

  - You are about to drop the column `created_at` on the `service_orders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `service_orders` table. All the data in the column will be lost.
  - You are about to drop the column `finished_at` on the `service_orders` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `service_orders` table. All the data in the column will be lost.
  - You are about to drop the column `service_id` on the `service_orders` table. All the data in the column will be lost.
  - You are about to drop the column `started_at` on the `service_orders` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `service_orders` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `services` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[email,userId]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documento,userId]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `service_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `service_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceName` to the `service_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicePrice` to the `service_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `service_orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "service_orders" DROP CONSTRAINT "service_orders_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "service_orders" DROP CONSTRAINT "service_orders_service_id_fkey";

-- DropForeignKey
ALTER TABLE "service_orders" DROP CONSTRAINT "service_orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_userId_fkey";

-- DropIndex
DROP INDEX "clients_documento_key";

-- DropIndex
DROP INDEX "clients_email_key";

-- AlterTable
ALTER TABLE "service_orders" DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "finished_at",
DROP COLUMN "price",
DROP COLUMN "service_id",
DROP COLUMN "started_at",
DROP COLUMN "updated_at",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "finishedAt" TIMESTAMP(3),
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "serviceName" TEXT NOT NULL,
ADD COLUMN     "servicePrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "is_active" SET DEFAULT true;

-- CreateIndex
CREATE INDEX "clients_userId_idx" ON "clients"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_userId_key" ON "clients"("email", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "clients_documento_userId_key" ON "clients"("documento", "userId");

-- CreateIndex
CREATE INDEX "service_orders_userId_idx" ON "service_orders"("userId");

-- CreateIndex
CREATE INDEX "service_orders_clientId_idx" ON "service_orders"("clientId");

-- CreateIndex
CREATE INDEX "service_orders_serviceId_idx" ON "service_orders"("serviceId");

-- CreateIndex
CREATE INDEX "service_orders_status_idx" ON "service_orders"("status");

-- CreateIndex
CREATE INDEX "services_userId_idx" ON "services"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "services_name_userId_key" ON "services"("name", "userId");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
