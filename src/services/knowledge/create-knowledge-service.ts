import { prisma } from "@/databases/db";
import { type Either, right } from "../../helpers/either";
import { ollamaEmbeddingService } from "../ollama-embedding";
import type { Service } from "../service";

export interface CreateKnowledgeServiceRequest {
	problem: string;
	soluction: string;
}

export type CreateKnowledgeServiceResponse = Either<
	never,
	{ knowledgeId: number }
>;

export class CreateKnowledgeService
	implements
		Service<CreateKnowledgeServiceRequest, CreateKnowledgeServiceResponse>
{
	async execute(
		request: CreateKnowledgeServiceRequest,
	): Promise<CreateKnowledgeServiceResponse> {
		const { problem, soluction } = request;

		const embedding = await ollamaEmbeddingService(problem);

		const createKnowledge = await prisma.knowledgeBase.create({
			data: {
				problem,
				soluction,
				embedding,
			},
		});

		const { id } = createKnowledge;

		return right({
			knowledgeId: id,
		});
	}
}
