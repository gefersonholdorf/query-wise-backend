import bcrypt from "bcryptjs";
import type { FastifyInstance } from "fastify";
import { PrismaUserRepository } from "@/databases/prisma/prisma-user-repository";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { UnexpectedError } from "@/errors/unexpected-error";
import { type Either, left, right } from "@/helpers/either";
import type { Service } from "../service";

export interface LoginServiceRequest {
	cpf: string;
	password: string;
}

export type LoginServiceResponse = Either<
	UnexpectedError | InvalidCredentialsError,
	{ token: string }
>;

export class LoginService
	implements Service<LoginServiceRequest, LoginServiceResponse>
{
	userRepository = new PrismaUserRepository();

	constructor(private readonly app: FastifyInstance) {}

	async execute(
		serviceRequest: LoginServiceRequest,
	): Promise<LoginServiceResponse> {
		const { cpf, password } = serviceRequest;

		try {
			const existingUserByCpf = await this.userRepository.findByCpf(cpf);

			if (!existingUserByCpf) {
				return left(new InvalidCredentialsError());
			}

			const passwordHashed = existingUserByCpf.user.password;

			const isPasswordValid = await bcrypt.compare(password, passwordHashed);

			if (!isPasswordValid) {
				return left(new InvalidCredentialsError());
			}

			const token = this.app.jwt.sign({
				userId: existingUserByCpf.user.id,
			});

			return right({
				token,
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
