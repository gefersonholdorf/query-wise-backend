import type { Tag } from "@/models/tag";

export interface TagsRepository {
	create(
		data: Omit<Tag, "id" | "createdAt" | "updatedAt">,
	): Promise<{ tagId: number }>;

	getAll(): Promise<
		(Omit<Tag, "createdAt" | "updatedAt"> & { quantity: number })[]
	>;
}
