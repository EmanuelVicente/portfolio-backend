-- CreateTable
CREATE TABLE "AssistantExchange" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssistantExchange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AssistantExchange_createdAt_idx" ON "AssistantExchange"("createdAt");
