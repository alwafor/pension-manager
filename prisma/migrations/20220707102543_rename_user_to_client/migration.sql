/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "surname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "workExperience" INTEGER NOT NULL,
    "isInvalidity" BOOLEAN NOT NULL,
    "isLossOfBreadwinner" BOOLEAN NOT NULL,
    "profession" TEXT NOT NULL,
    "invalidityGroup" TEXT,
    "invalidityAge" INTEGER,
    "invalidityCertificateText" TEXT,
    "breadwinnerSurname" TEXT,
    "breadwinnerName" TEXT,
    "breadwinnerPatronymic" TEXT,
    "breadwinnerGender" TEXT,
    "breadwinnerAge" INTEGER,
    "breadwinnerWorkExperience" INTEGER,
    "breadwinnerCertificateText" TEXT
);
