// import { prisma } from "@/databases/db";
// import type { Knowledge } from "@/models/knowledge";
// import { type Either, right } from "../../helpers/either";
// import type { Service } from "../service";

// export interface FetchKnowledgeServiceRequest {
// 	search: string;
// }

// export type FetchKnowledgeServiceResponse = Either<
// 	never,
// 	{ knowledges: KnowledgeWithoutSomeFields[] }
// >;

// type KnowledgeWithoutSomeFields = Omit<Knowledge, "embedding">;

// export class FetchKnowledgeService
// 	implements
// 		Service<FetchKnowledgeServiceRequest, FetchKnowledgeServiceResponse>
// {
// 	async execute(
// 		request: FetchKnowledgeServiceRequest,
// 	): Promise<FetchKnowledgeServiceResponse> {
// 		const { search } = request;

// 		return right({
// 			knowledges,
// 		});
// 	}
// }
