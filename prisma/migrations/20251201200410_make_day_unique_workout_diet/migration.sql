/*
  Warnings:

  - A unique constraint covering the columns `[day]` on the table `Diet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[day]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Diet_day_key" ON "Diet"("day");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_day_key" ON "Workout"("day");
