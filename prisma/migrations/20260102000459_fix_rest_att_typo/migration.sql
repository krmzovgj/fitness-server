/*
  Warnings:

  - You are about to drop the column `restBetweenAfter` on the `WorkoutExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "restBetweenAfter",
ADD COLUMN     "restBetweenSets" INTEGER;
