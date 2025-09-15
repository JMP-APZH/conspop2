-- AlterTable
ALTER TABLE "users" ADD COLUMN     "diasporaLocationId" TEXT;

-- CreateTable
CREATE TABLE "diaspora_locations" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "region" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diaspora_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "diaspora_locations_country_key" ON "diaspora_locations"("country");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_diasporaLocationId_fkey" FOREIGN KEY ("diasporaLocationId") REFERENCES "diaspora_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
