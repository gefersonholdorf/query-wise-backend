import { PrismaUserRepository } from "@/databases/prisma/prisma-user-repository";
import { UnexpectedError } from "@/errors/unexpected-error";
import type { FetchOfPagination } from "@/models/fetch-of-pagination";
import type { UserDetail } from "@/models/user";
import { type Either, left, right } from "../../helpers/either";
import type { Service } from "../service";

export interface FetchUsersServiceRequest {
	page?: number;
	pageSize?: number;
	orderBy?: string;
	orderDirection?: "asc" | "desc";
}

export type FetchUsersServiceResponse = Either<
	UnexpectedError,
	{ response: FetchOfPagination<UserDetail> }
>;

export class FetchUsersService
	implements Service<FetchUsersServiceRequest, FetchUsersServiceResponse>
{
	userRepository = new PrismaUserRepository();

	async execute(
		request: FetchUsersServiceRequest,
	): Promise<FetchUsersServiceResponse> {
		const { page, pageSize, orderBy, orderDirection } = request;

		try {
			const fetchUsers = await this.userRepository.findAll({
				page,
				pageSize,
				orderBy,
				orderDirection,
			});

			return right({
				response: fetchUsers,
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
