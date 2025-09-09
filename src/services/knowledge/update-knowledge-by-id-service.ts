// import { PrismaKnowledgeRepository } from "@/databases/prisma/prisma-knowledge";
// import { EntityNotFoundError } from "@/errors/entity-not-found-error";
// import { type Either, left, right } from "../../helpers/either";
// import { ollamaEmbeddingService } from "../ollama/ollama-embedding";
// import type { Service } from "../service";

// export interface UpdateKnowledgeByIdServiceRequest {
// 	id: number;
// 	problem: string;
// 	soluction: string;
// }

// export type UpdateKnowledgeByIdServiceResponse = Either<
// 	EntityNotFoundError,
// 	{ knowledgeId: number }
// >;

// export class UpdateKnowledgeByIdService
// 	implements
// 		Service<
// 			UpdateKnowledgeByIdServiceRequest,
// 			UpdateKnowledgeByIdServiceResponse
// 		>
// {
// 	knowledgeRepository = new PrismaKnowledgeRepository();

// 	async execute(
// 		request: UpdateKnowledgeByIdServiceRequest,
// 	): Promise<UpdateKnowledgeByIdServiceResponse> {
// 		const { id, problem, soluction } = request;

// 		const embedding = await ollamaEmbeddingService(problem);

// 		const knowledgeEdit = await this.knowledgeRepository.update({
// 			id,
// 			problem,
// 			solution: soluction,
// 			embedding,
// 		});

// 		if (!knowledgeEdit) {
// 			return left(new EntityNotFoundError("Conhecimento não encontrado."));
// 		}

// 		const { knowledgeId } = knowledgeEdit;

// 		return right({
// 			knowledgeId,
// 		});
// 	}
// }
