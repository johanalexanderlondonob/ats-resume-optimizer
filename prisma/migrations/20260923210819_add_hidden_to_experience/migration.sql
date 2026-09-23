-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resumeBaseId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "finishDate" DATETIME,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Experience_resumeBaseId_fkey" FOREIGN KEY ("resumeBaseId") REFERENCES "ResumeBase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Experience" ("company", "finishDate", "id", "position", "resumeBaseId", "startDate") SELECT "company", "finishDate", "id", "position", "resumeBaseId", "startDate" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
