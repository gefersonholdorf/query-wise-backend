import { prisma } from "@/databases/db";
import { type Either, right } from "../../helpers/either";
import { ollamaEmbeddingService } from "../ollama-embedding";
import type { Service } from "../service";

export interface CreateKnowledgeServiceRequest {
	question: string;
	answer: string;
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
		const { question, answer } = request;

		const embedding = await ollamaEmbeddingService(question);

		const createKnowledge = await prisma.knowledgeBase.create({
			data: {
				question,
				answer,
				embedding,
			},
		});

		const { id } = createKnowledge;

		return right({
			knowledgeId: id,
		});
	}
}
