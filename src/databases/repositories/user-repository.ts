import type { FetchOfPagination } from "@/models/fetch-of-pagination";
import type { PaginationParams } from "@/models/pagination-params";
import type { CreateUser, UserDetail } from "@/models/user";

export interface UserRepository {
	create(data: CreateUser): Promise<{ userId: number }>;
	findByCpf(cpf: string): Promise<{ user: UserDetail } | null>;
	findById(id: number): Promise<{ user: UserDetail } | null>;
	findAll(
		paginationParams: PaginationParams,
	): Promise<FetchOfPagination<UserDetail>>;
}
