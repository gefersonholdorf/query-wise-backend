import type { KnowledgeBase } from "@prisma/client";
import { prisma } from "@/databases/db";
import { cosineSimilarity } from "@/helpers/cosineSimilarity";
import { type Either, right } from "../../helpers/either";
import { ollamaEmbeddingService } from "../ollama-embedding";
import type { Service } from "../service";

export interface MatchKnowledgeServiceRequest {
	message: string;
}

export type MatchKnowledgeServiceResponse = Either<
	never,
	{ bestMatchs: BestMatch[] }
>;

interface BestMatch {
	id: number;
	problem: string;
	soluction: string;
	similarity: number;
}

export class MatchKnowledgeService
	implements
		Service<MatchKnowledgeServiceRequest, MatchKnowledgeServiceResponse>
{
	async execute(
		request: MatchKnowledgeServiceRequest,
	): Promise<MatchKnowledgeServiceResponse> {
		const { message } = request;

		const embedding = await ollamaEmbeddingService(message);

		const knowledges: KnowledgeBase[] = await prisma.knowledgeBase.findMany();

		const results = knowledges.map((knowledge: KnowledgeBase) => {
			return {
				id: knowledge.id,
				problem: knowledge.problem,
				soluction: knowledge.soluction,
				similarity: cosineSimilarity(embedding, knowledge.embedding),
			};
		});

		results.sort((a, b) => b.similarity - a.similarity);

		const bestMatchs: BestMatch[] = results.filter((r) => r.similarity >= 0.8);

		return right({
			bestMatchs,
		});
	}
}
