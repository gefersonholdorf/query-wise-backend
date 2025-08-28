import { prisma } from "@/databases/db";
import { KnowledgeMapper } from "@/databases/mappers/knowledge-mapper";
import type { KnowledgeRepository } from "@/databases/repositories/knowledges-repository";
import type { Knowledge } from "@/models/knowledge";

export class PrismaKnowledgeRepository implements KnowledgeRepository {
	async create(data: Knowledge): Promise<{ knowledgeId: number }> {
		throw new Error("Method not implemented.");
	}

	async getAll(search?: string): Promise<Knowledge[]> {
		const knowledges = await prisma.knowledgeBase.findMany({
			where: {
				problem: {
					contains: search,
					mode: "insensitive",
				},
			},
			include: {
				tags: {
					include: {
						tag: true,
					},
				},
			},
		});

		return KnowledgeMapper.toDomain(knowledges);
	}
}
