import { PrismaUserRepository } from "@/databases/prisma/prisma-user-repository";
import { EntityNotFoundError } from "@/errors/entity-not-found-error";
import { UnexpectedError } from "@/errors/unexpected-error";
import type { UserDetail } from "@/models/user";
import { type Either, left, right } from "../../helpers/either";
import type { Service } from "../service";

export interface UpdateUserServiceRequest {
	id: number;
	name?: string;
	isActive?: boolean;
}

export type UpdateUserServiceResponse = Either<
	UnexpectedError | EntityNotFoundError,
	{ userId: number }
>;

export class UpdateUserService
	implements Service<UpdateUserServiceRequest, UpdateUserServiceResponse>
{
	userRepository = new PrismaUserRepository();

	async execute(
		request: UpdateUserServiceRequest,
	): Promise<UpdateUserServiceResponse> {
		const { id, name, isActive } = request;

		try {
			const existingUserById = await this.userRepository.findById(id);

			if (!existingUserById) {
				return left(new EntityNotFoundError("Usuário não encontrado."));
			}

			const updateUser: UserDetail = {
				...existingUserById.user,
				name: name ?? existingUserById.user.name,
				isActive: isActive ?? existingUserById.user.isActive,
			};

			const newUser = await this.userRepository.save({
				id: updateUser.id,
				name: updateUser.name,
				isActive: updateUser.isActive,
			});

			const { userId } = newUser;

			return right({
				userId,
			});
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				return left(new UnexpectedError(error));
			}

			return left(new UnexpectedError(new Error("Erro inesperado.")));
		}
	}
}
