import { PrismaKnowledgeRepository } from "@/databases/prisma/prisma-knowledge";
import { EntityNotFoundError } from "@/errors/entity-not-found-error";
import { type Either, left, right } from "../../helpers/either";
import type { Service } from "../service";

export interface DeleteKnowledgeServiceRequest {
	id: number;
}

export type DeleteKnowledgeServiceResponse = Either<
	EntityNotFoundError,
	{ knowledgeId: number } | null
>;

export class DeleteKnowledgeService
	implements
		Service<DeleteKnowledgeServiceRequest, DeleteKnowledgeServiceResponse>
{
	knowledgeRepository = new PrismaKnowledgeRepository();

	async execute(
		request: DeleteKnowledgeServiceRequest,
	): Promise<DeleteKnowledgeServiceResponse> {
		const { id } = request;

		const knowledge = await this.knowledgeRepository.delete(id);

		if (!knowledge) {
			return left(new EntityNotFoundError("Conhecimento não encontrado."));
		}

		const { knowledgeId } = knowledge;

		return right({
			knowledgeId,
		});
	}
}
