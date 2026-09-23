-- AlterTable
ALTER TABLE "Project" ADD COLUMN "evidenceUrl" TEXT;

-- La evidencia pasa de cada logro al proyecto: conservamos el primer enlace
-- registrado en sus logros para no perder datos existentes.
UPDATE "Project"
SET "evidenceUrl" = (
    SELECT "evidence" FROM "Achievement"
    WHERE "Achievement"."projectId" = "Project"."id" AND TRIM("evidence") <> ''
    ORDER BY "rowid"
    LIMIT 1
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metric" TEXT,
    CONSTRAINT "Achievement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Achievement" ("description", "id", "metric", "projectId") SELECT "description", "id", "metric", "projectId" FROM "Achievement";
DROP TABLE "Achievement";
ALTER TABLE "new_Achievement" RENAME TO "Achievement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
