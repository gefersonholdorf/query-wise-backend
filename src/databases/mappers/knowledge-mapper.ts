import type { KnowledgeBase, KnowledgeBaseTag, Tag } from "@prisma/client";
import type { Knowledge } from "@/models/knowledge";

export type PrismaKnowledge = KnowledgeBase & {
	tags: (KnowledgeBaseTag & {
		tag: Tag;
	})[];
};

// biome-ignore lint/complexity/noStaticOnlyClass: <"explanation">
export class KnowledgeMapper {
	static toDomain(knowledges: PrismaKnowledge[]): Knowledge[] {
		return knowledges.map((knowledge) => {
			return {
				id: knowledge.id,
				problem: knowledge.problem,
				soluction: knowledge.soluction,
				tags: knowledge.tags.map((tag) => {
					return tag.tag;
				}),
				embedding: knowledge.embedding,
				createdAt: knowledge.createdAt,
				updatedAt: knowledge.updatedAt,
			};
		});
	}
}
