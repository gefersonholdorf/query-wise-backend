-- DropForeignKey
ALTER TABLE "public"."knowledge_base_tags" DROP CONSTRAINT "knowledge_base_tags_knowledgeBaseId_fkey";

-- AddForeignKey
ALTER TABLE "public"."knowledge_base_tags" ADD CONSTRAINT "knowledge_base_tags_knowledgeBaseId_fkey" FOREIGN KEY ("knowledgeBaseId") REFERENCES "public"."knowledge_base"("id") ON DELETE CASCADE ON UPDATE CASCADE;
