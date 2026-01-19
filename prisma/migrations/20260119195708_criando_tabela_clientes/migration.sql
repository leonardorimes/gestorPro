/*
  Warnings:

  - You are about to drop the column `password` on the `clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[documento]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documento` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('FISICA', 'JURIDICA');

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "password",
ADD COLUMN     "documento" TEXT NOT NULL,
ADD COLUMN     "tipo" "TipoPessoa" NOT NULL DEFAULT 'FISICA';

-- CreateIndex
CREATE UNIQUE INDEX "clients_documento_key" ON "clients"("documento");
