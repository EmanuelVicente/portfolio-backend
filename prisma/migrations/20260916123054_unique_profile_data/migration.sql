/*
  Warnings:

  - A unique constraint covering the columns `[profileId,institution,degree]` on the table `Education` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId,name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId,category,name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Education_profileId_institution_degree_key" ON "Education"("profileId", "institution", "degree");

-- CreateIndex
CREATE UNIQUE INDEX "Project_profileId_name_key" ON "Project"("profileId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_profileId_category_name_key" ON "Skill"("profileId", "category", "name");
