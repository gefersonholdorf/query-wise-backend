import { PrismaTags } from "@/databases/prisma/prisma-tags";
import type { Tag } from "@/models/tag";
import { type Either, right } from "../../helpers/either";
import type { Service } from "../service";

export type FetchTagsServiceResponse = Either<
	never,
	{ fetchTags: (Omit<Tag, "createdAt" | "updatedAt"> & { quantity: number })[] }
>;

export class FetchTagsService
	implements Service<never, FetchTagsServiceResponse>
{
	tagRepository = new PrismaTags();

	async execute(): Promise<FetchTagsServiceResponse> {
		const fetchTags = await this.tagRepository.getAll();

		return right({
			fetchTags,
		});
	}
}
