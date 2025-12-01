/*
  Warnings:

  - You are about to drop the column `day` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `day` to the `Diet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diet" ADD COLUMN     "day" "Day" NOT NULL;

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "day",
ALTER COLUMN "reps" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "day";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "day" "Day" NOT NULL;
