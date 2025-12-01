/*
  Warnings:

  - A unique constraint covering the columns `[day,clientId]` on the table `Diet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[day,clientId]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Diet_day_key";

-- DropIndex
DROP INDEX "Workout_day_key";

-- CreateIndex
CREATE UNIQUE INDEX "Diet_day_clientId_key" ON "Diet"("day", "clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_day_clientId_key" ON "Workout"("day", "clientId");
