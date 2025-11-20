/*
  Warnings:

  - Made the column `workoutId` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "workoutId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
