import { PrismaKnowledgeRepository } from "@/databases/prisma/prisma-knowledge";
import type { Knowledge } from "@/models/knowledge";
import type { Tag } from "@/models/tag";
import { type Either, right } from "../../helpers/either";
import type { Service } from "../service";

export interface FetchKnowledgeServiceRequest {
	search?: string;
	tagId?: number;
}

export type FetchKnowledgeServiceResponse = Either<
	never,
	{ knowledges: KnowledgeWithoutSomeFields }
>;

type KnowledgeWithoutSomeFields = (Omit<
	Knowledge,
	"updatedAt" | "embedding" | "tags"
> & {
	tags: Omit<Tag, "updatedAt" | "createdAt">[];
})[];

export class FetchKnowledgeService
	implements
		Service<FetchKnowledgeServiceRequest, FetchKnowledgeServiceResponse>
{
	knowledgeRepository = new PrismaKnowledgeRepository();

	async execute(
		request: FetchKnowledgeServiceRequest,
	): Promise<FetchKnowledgeServiceResponse> {
		const { search, tagId } = request;

		const knowledges = await this.knowledgeRepository.getAll({
			search,
			tagId,
		});

		return right({
			knowledges,
		});
	}
}
