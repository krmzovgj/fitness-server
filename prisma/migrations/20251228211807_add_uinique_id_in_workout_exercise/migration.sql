/*
  Warnings:

  - The primary key for the `WorkoutExercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `WorkoutExercise` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id");
