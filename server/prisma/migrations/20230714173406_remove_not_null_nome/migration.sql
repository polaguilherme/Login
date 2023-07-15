-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT
);
INSERT INTO "new_Cliente" ("email", "id", "nome", "senha") SELECT "email", "id", "nome", "senha" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
