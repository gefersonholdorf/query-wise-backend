import { prisma } from "@/databases/db";
import type {
	KnowledgeParams,
	KnowledgeRepository,
	UpdateKnowledgeDTO,
} from "@/databases/repositories/knowledges-repository";
import type { Knowledge } from "@/models/knowledge";
import type { Tag } from "@/models/tag";

export class PrismaKnowledgeRepository implements KnowledgeRepository {
	async create(
		data: Omit<Knowledge, "id" | "createdAt" | "updatedAt">,
	): Promise<{ knowledgeId: number }> {
		const { problem, soluction, embedding, tags } = data;

		const resultTransaction = await prisma.$transaction(async (tx) => {
			const newKnowledge = await tx.knowledgeBase.create({
				data: {
					problem,
					soluction,
					embedding,
				},
			});

			if (tags && tags.length > 0) {
				const tagPromises = tags.map(async (tag) => {
					await tx.knowledgeBaseTag.create({
						data: {
							knowledgeBaseId: newKnowledge.id,
							tagId: tag,
						},
					});
				});
				await Promise.all(tagPromises);
			}

			return newKnowledge;
		});

		const { id: knowledgeId } = resultTransaction;

		return {
			knowledgeId,
		};
	}

	async getAll(params: KnowledgeParams): Promise<
		(Omit<Knowledge, "updatedAt" | "embedding" | "tags"> & {
			tags: Omit<Tag, "updatedAt" | "createdAt">[];
		})[]
	> {
		const { search: problem, tagId } = params;

		const knowledges = await prisma.knowledgeBase.findMany({
			orderBy: {
				id: "desc",
			},
			where: {
				problem: problem
					? { contains: problem, mode: "insensitive" }
					: undefined,
				tags: {
					some: {
						tagId,
					},
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

		return knowledges.map((knowledge) => {
			const {
				id,
				problem,
				soluction,
				createdAt,
				tags: tagsFormated,
			} = knowledge;

			const tags = tagsFormated.map((tag) => {
				return {
					id: tag.tag.id,
					name: tag.tag.name,
				};
			});
			return {
				id,
				problem,
				soluction,
				createdAt,
				tags,
			};
		});
	}

	async delete(id: number): Promise<{ knowledgeId: number } | null> {
		const knowledge = await prisma.knowledgeBase.findUnique({ where: { id } });

		if (!knowledge) {
			return null;
		}

		const deletedKnowledge = await prisma.knowledgeBase.delete({
			where: { id },
		});

		return {
			knowledgeId: deletedKnowledge.id,
		};
	}

	async update(
		updateKnowledge: UpdateKnowledgeDTO,
	): Promise<{ knowledgeId: number } | null> {
		const { id, problem, soluction, embedding } = updateKnowledge;

		const knowledge = await prisma.knowledgeBase.findUnique({
			where: {
				id,
			},
		});

		if (!knowledge) {
			return null;
		}

		const knowledgeEdit = await prisma.knowledgeBase.update({
			data: {
				problem,
				soluction,
				embedding,
			},
			where: {
				id,
			},
		});

		const { id: knowledgeId } = knowledgeEdit;

		return {
			knowledgeId,
		};
	}
}
