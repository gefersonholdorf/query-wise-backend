import { prisma } from "@/databases/db";
import type { TagsRepository } from "@/databases/repositories/tags-repository";
import type { Tag } from "@/models/tag";

export class PrismaTags implements TagsRepository {
	async getAll(): Promise<
		(Omit<Tag, "createdAt" | "updatedAt"> & { quantity: number })[]
	> {
		const tags = await prisma.tag.findMany({
			include: {
				_count: {
					select: {
						knowledges: true,
					},
				},
			},
		});

		return tags.map((tag) => {
			return {
				id: tag.id,
				name: tag.name,
				quantity: tag._count.knowledges,
			};
		});
	}

	async create(
		data: Omit<Tag, "id" | "createdAt" | "updatedAt">,
	): Promise<{ tagId: number }> {
		const createTag = await prisma.tag.create({
			data,
		});

		const { id: tagId } = createTag;

		return {
			tagId,
		};
	}
}
