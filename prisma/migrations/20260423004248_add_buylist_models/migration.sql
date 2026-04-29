-- CreateTable
CREATE TABLE "BuylistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "setName" TEXT,
    "cardNumber" TEXT,
    "rarity" TEXT,
    "imageUrl" TEXT NOT NULL,
    "buyPrice" REAL NOT NULL,
    "acceptsMint" BOOLEAN NOT NULL DEFAULT true,
    "acceptsNearMint" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SellSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "buylistId" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "estimatedTotal" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SellSubmissionItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "buylistItemId" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "setName" TEXT,
    "quantity" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "offeredBuyPrice" REAL NOT NULL,
    "lineTotal" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SellSubmissionItem_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "SellSubmission" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SellSubmissionItem_buylistItemId_fkey" FOREIGN KEY ("buylistItemId") REFERENCES "BuylistItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SellSubmission_buylistId_key" ON "SellSubmission"("buylistId");
