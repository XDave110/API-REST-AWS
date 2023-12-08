/*
  Warnings:

  - You are about to drop the column `horasClases` on the `Profesor` table. All the data in the column will be lost.
  - Added the required column `horasClase` to the `Profesor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profesor" DROP COLUMN "horasClases",
ADD COLUMN     "horasClase" INTEGER NOT NULL;
