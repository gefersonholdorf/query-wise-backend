/*
  Warnings:

  - You are about to drop the column `answer` on the `knowledge_base` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `knowledge_base` table. All the data in the column will be lost.
  - Added the required column `problem` to the `knowledge_base` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soluction` to the `knowledge_base` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."knowledge_base" DROP COLUMN "answer",
DROP COLUMN "question",
ADD COLUMN     "problem" TEXT NOT NULL,
ADD COLUMN     "soluction" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."knowledge_base_tags" (
    "knowledgeBaseId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "knowledge_base_tags_pkey" PRIMARY KEY ("knowledgeBaseId","tagId")
);

-- CreateTable
CREATE TABLE "public"."tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."knowledge_base_tags" ADD CONSTRAINT "knowledge_base_tags_knowledgeBaseId_fkey" FOREIGN KEY ("knowledgeBaseId") REFERENCES "public"."knowledge_base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."knowledge_base_tags" ADD CONSTRAINT "knowledge_base_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
