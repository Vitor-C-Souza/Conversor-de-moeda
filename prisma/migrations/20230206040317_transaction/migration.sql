-- CreateTable
CREATE TABLE "TransactionOfConversion" (
    "UserId" TEXT NOT NULL PRIMARY KEY,
    "currencyOrigin" TEXT NOT NULL,
    "valueOrigin" TEXT NOT NULL,
    "currencyDestiny" TEXT NOT NULL,
    "TXConversor" REAL NOT NULL,
    "DateTimeUTC" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TransactionDone" (
    "TransactionId" TEXT NOT NULL PRIMARY KEY,
    "UserId" TEXT NOT NULL,
    "currencyOrigin" TEXT NOT NULL,
    "valueOrigin" TEXT NOT NULL,
    "currencyDestiny" TEXT NOT NULL,
    "valueDestiny" REAL NOT NULL,
    "TXConversor" REAL NOT NULL,
    "DateTimeUTC" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionOfConversion_UserId_key" ON "TransactionOfConversion"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionDone_TransactionId_key" ON "TransactionDone"("TransactionId");
