-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InventoryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "setName" TEXT,
    "sku" TEXT,
    "imageUrl" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL DEFAULT 0,
    "manualPrice" REAL,
    "currentPrice" REAL NOT NULL DEFAULT 0,
    "priceSource" TEXT NOT NULL DEFAULT 'MANUAL',
    "tcgplayerProductId" TEXT,
    "tcgplayerSkuId" TEXT,
    "lastSoldPrice" REAL,
    "lastPriceUpdated" DATETIME,
    "description" TEXT,
    "cardNumber" TEXT,
    "rarity" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_InventoryItem" ("category", "createdAt", "currentPrice", "id", "imageUrl", "inventory", "lastPriceUpdated", "lastSoldPrice", "manualPrice", "name", "priceSource", "setName", "sku", "tcgplayerProductId", "tcgplayerSkuId", "updatedAt") SELECT "category", "createdAt", "currentPrice", "id", "imageUrl", "inventory", "lastPriceUpdated", "lastSoldPrice", "manualPrice", "name", "priceSource", "setName", "sku", "tcgplayerProductId", "tcgplayerSkuId", "updatedAt" FROM "InventoryItem";
DROP TABLE "InventoryItem";
ALTER TABLE "new_InventoryItem" RENAME TO "InventoryItem";
CREATE UNIQUE INDEX "InventoryItem_sku_key" ON "InventoryItem"("sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
