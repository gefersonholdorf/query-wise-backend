import type { Knowledge } from "@/models/knowledge";
import type { Tag } from "@/models/tag";

export interface KnowledgeParams {
	search?: string;
	tagId?: number;
}

export type CreateKnowledgeDTO = Omit<
	Knowledge,
	"id" | "createdAt" | "updatedAt"
>;

export type FetchKnowledgesDTO = (Omit<
	Knowledge,
	"updatedAt" | "embedding" | "tags"
> & {
	tags: Omit<Tag, "updatedAt" | "createdAt">[];
})[];

export interface KnowledgeRepository {
	create(data: CreateKnowledgeDTO): Promise<{ knowledgeId: number }>;
	getAll(params: KnowledgeParams): Promise<FetchKnowledgesDTO>;
	delete(id: number): Promise<{ knowledgeId: number } | null>;
}
