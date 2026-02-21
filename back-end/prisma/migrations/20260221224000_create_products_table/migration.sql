/*
  Warnings:

  - Added the required column `productId` to the `CartProducts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartProducts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CartProducts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Carts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CartProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CartProducts" ("cartId", "createdAt", "id", "quantity", "updatedAt") SELECT "cartId", "createdAt", "id", "quantity", "updatedAt" FROM "CartProducts";
DROP TABLE "CartProducts";
ALTER TABLE "new_CartProducts" RENAME TO "CartProducts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
