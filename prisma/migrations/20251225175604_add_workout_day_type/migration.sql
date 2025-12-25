-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('REST', 'CARDIO', 'STRENGTH', 'FULL_BODY', 'MOBILITY');

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "type" "WorkoutType";
