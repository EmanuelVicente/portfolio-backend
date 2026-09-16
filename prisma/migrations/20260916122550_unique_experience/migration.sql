/*
  Warnings:

  - A unique constraint covering the columns `[profileId,company,role]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Experience_profileId_company_role_key" ON "Experience"("profileId", "company", "role");
