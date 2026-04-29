-- CreateTable
CREATE TABLE "InventoryItem" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_sku_key" ON "InventoryItem"("sku");
