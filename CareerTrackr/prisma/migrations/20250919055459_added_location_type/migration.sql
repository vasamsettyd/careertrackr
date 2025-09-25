/*
  Warnings:

  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."LocationType" AS ENUM ('remote', 'on_site', 'hybrid');

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "location",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "location_type" "public"."LocationType";
