/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CityAgglomeration" AS ENUM ('CENTRE', 'NORD', 'SUD');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "martinique_cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "agglomeration" "CityAgglomeration" NOT NULL,
    "population" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "martinique_cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickname" TEXT,
    "isDiaspora" BOOLEAN NOT NULL DEFAULT false,
    "cityOfOriginId" TEXT NOT NULL,
    "currentCityId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "martinique_cities_name_key" ON "martinique_cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cityOfOriginId_fkey" FOREIGN KEY ("cityOfOriginId") REFERENCES "martinique_cities"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_currentCityId_fkey" FOREIGN KEY ("currentCityId") REFERENCES "martinique_cities"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
