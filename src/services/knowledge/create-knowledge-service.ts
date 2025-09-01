import { PrismaKnowledgeRepository } from "@/databases/prisma/prisma-knowledge";
import { type Either, right } from "../../helpers/either";
import { ollamaEmbeddingService } from "../ollama-embedding";
import type { Service } from "../service";

export interface CreateKnowledgeServiceRequest {
	problem: string;
	soluction: string;
	tags: number[];
}

export type CreateKnowledgeServiceResponse = Either<
	never,
	{ knowledgeId: number }
>;

export class CreateKnowledgeService
	implements
		Service<CreateKnowledgeServiceRequest, CreateKnowledgeServiceResponse>
{
	knowledgeRepository = new PrismaKnowledgeRepository();

	async execute(
		request: CreateKnowledgeServiceRequest,
	): Promise<CreateKnowledgeServiceResponse> {
		const { problem, soluction, tags } = request;

		const embedding = await ollamaEmbeddingService(problem);

		const newKnowledge = await this.knowledgeRepository.create({
			problem,
			soluction,
			tags,
			embedding,
		});

		const { knowledgeId } = newKnowledge;

		return right({
			knowledgeId,
		});
	}
}
