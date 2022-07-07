-- CreateTable
CREATE TABLE "User" (
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
