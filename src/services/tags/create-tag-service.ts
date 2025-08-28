import { PrismaTags } from "@/databases/prisma/prisma-tags";
import { type Either, right } from "../../helpers/either";
import type { Service } from "../service";

export interface CreateTagServiceRequest {
	name: string;
}

export type CreateTagServiceResponse = Either<never, { tagId: number }>;

export class CreateTagService
	implements Service<CreateTagServiceRequest, CreateTagServiceResponse>
{
	tagRepository = new PrismaTags();

	async execute(
		request: CreateTagServiceRequest,
	): Promise<CreateTagServiceResponse> {
		const { name } = request;

		const createTag = await this.tagRepository.create({
			name,
		});

		const { tagId } = createTag;

		return right({
			tagId,
		});
	}
}
