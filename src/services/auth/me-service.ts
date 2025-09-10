import { PrismaUserRepository } from "@/databases/prisma/prisma-user-repository";
import { EntityNotFoundError } from "@/errors/entity-not-found-error";
import { UnexpectedError } from "@/errors/unexpected-error";
import { type Either, left, right } from "@/helpers/either";
import type { UserDetail } from "@/models/user";
import type { Service } from "../service";

export interface MeServiceRequest {
	userId: number;
}

export type MeServiceResponse = Either<
	UnexpectedError | EntityNotFoundError,
	{ user: UserDetail }
>;

export class MeService implements Service<MeServiceRequest, MeServiceResponse> {
	userRepository = new PrismaUserRepository();

	async execute(serviceRequest: MeServiceRequest): Promise<MeServiceResponse> {
		const { userId } = serviceRequest;

		try {
			const user = await this.userRepository.findById(userId);

			if (!user) {
				return left(new EntityNotFoundError("Usuário não encontrado."));
			}

			return right(user);
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				return left(new UnexpectedError(error));
			}

			return left(new UnexpectedError(new Error("Erro inesperado.")));
		}
	}
}
