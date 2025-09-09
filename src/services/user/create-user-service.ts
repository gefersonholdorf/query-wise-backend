import bcrypt from "bcryptjs";
import { PrismaUserRepository } from "@/databases/prisma/prisma-user-repository";
import { ExistingEntityError } from "@/errors/existing-entity-error";
import { UnexpectedError } from "@/errors/unexpected-error";
import { type Either, left, right } from "../../helpers/either";
import type { Service } from "../service";

export interface CreateUserServiceRequest {
	name: string;
	email: string;
	cpf: string;
	password: string;
}

export type CreateUserServiceResponse = Either<
	UnexpectedError | ExistingEntityError,
	{ userId: number }
>;

export class CreateUserService
	implements Service<CreateUserServiceRequest, CreateUserServiceResponse>
{
	userRepository = new PrismaUserRepository();

	async execute(
		request: CreateUserServiceRequest,
	): Promise<CreateUserServiceResponse> {
		const { name, email, cpf, password } = request;

		const passwordHashed = await bcrypt.hash(password, 6);

		try {
			const existingUserByCpf = await this.userRepository.findByCpf(cpf);

			console.log(existingUserByCpf);

			if (existingUserByCpf) {
				return left(new ExistingEntityError("Usuário já existente."));
			}

			const newUser = await this.userRepository.create({
				name,
				email,
				cpf,
				password: passwordHashed,
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
