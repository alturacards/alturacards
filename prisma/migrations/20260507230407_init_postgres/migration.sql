-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('SINGLE_CARD', 'BOOSTER_PACK', 'BUNDLE', 'ETB');

-- CreateEnum
CREATE TYPE "PriceSource" AS ENUM ('MANUAL', 'TCGPLAYER_MARKET', 'LAST_SOLD');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'RECEIVED', 'REVIEWED', 'APPROVED', 'REJECTED', 'PAID');

-- CreateEnum
CREATE TYPE "CardCondition" AS ENUM ('MINT', 'NEAR_MINT');

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "setName" TEXT,
    "sku" TEXT,
    "imageUrl" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL DEFAULT 0,
    "manualPrice" DOUBLE PRECISION,
    "currentPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceSource" "PriceSource" NOT NULL DEFAULT 'MANUAL',
    "tcgplayerProductId" TEXT,
    "tcgplayerSkuId" TEXT,
    "lastSoldPrice" DOUBLE PRECISION,
    "lastPriceUpdated" TIMESTAMP(3),
    "description" TEXT,
    "cardNumber" TEXT,
    "rarity" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuylistItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "setName" TEXT,
    "cardNumber" TEXT,
    "rarity" TEXT,
    "imageUrl" TEXT NOT NULL,
    "buyPrice" DOUBLE PRECISION NOT NULL,
    "acceptsMint" BOOLEAN NOT NULL DEFAULT true,
    "acceptsNearMint" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuylistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellSubmission" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "buylistId" TEXT NOT NULL,
    "notes" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "estimatedTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SellSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellSubmissionItem" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "buylistItemId" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "setName" TEXT,
    "cardNumber" TEXT,
    "quantity" INTEGER NOT NULL,
    "condition" "CardCondition" NOT NULL,
    "offeredBuyPrice" DOUBLE PRECISION NOT NULL,
    "lineTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SellSubmissionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "stripeSessionId" TEXT,
    "customerEmail" TEXT,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'aud',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_sku_key" ON "InventoryItem"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "SellSubmission_buylistId_key" ON "SellSubmission"("buylistId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "Order"("stripeSessionId");

-- AddForeignKey
ALTER TABLE "SellSubmissionItem" ADD CONSTRAINT "SellSubmissionItem_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "SellSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellSubmissionItem" ADD CONSTRAINT "SellSubmissionItem_buylistItemId_fkey" FOREIGN KEY ("buylistItemId") REFERENCES "BuylistItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
