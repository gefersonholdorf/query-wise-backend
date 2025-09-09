import { QdrantKnowledgeBase } from "@/databases/qdrant/qdrant-knowledge-base";
import type { KnowledgeBaseResult } from "@/models/knowledge";
import { type Either, right } from "../../helpers/either";
import { ollamaEmbeddingService } from "../ollama/ollama-embedding";
import type { Service } from "../service";

export interface MatchKnowledgeServiceRequest {
	message: string;
}

export type MatchKnowledgeServiceResponse = Either<
	never,
	{ bestMatch: KnowledgeBaseResult }
>;

export class MatchKnowledgeService
	implements
		Service<MatchKnowledgeServiceRequest, MatchKnowledgeServiceResponse>
{
	knowledgeRepository = new QdrantKnowledgeBase();

	async execute(
		request: MatchKnowledgeServiceRequest,
	): Promise<MatchKnowledgeServiceResponse> {
		const { message } = request;

		const embedding = await ollamaEmbeddingService(message);

		const result = await this.knowledgeRepository.searchMatch(embedding);

		const response = result.data
			.filter((item) => item.score >= 0.8)
			.sort((a, b) => b.score - a.score);

		return right({
			bestMatch: response[0],
		});
	}
}
