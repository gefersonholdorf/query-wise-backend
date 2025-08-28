import type { Knowledge } from "@/models/knowledge";

export interface KnowledgeRepository {
	create(data: Knowledge): Promise<{ knowledgeId: number }>;
	getAll(search?: string): Promise<Knowledge[]>;
}
