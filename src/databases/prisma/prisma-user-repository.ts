/** biome-ignore-all lint/style/noNonNullAssertion: <"explanation"> */
import type { FetchOfPagination } from "@/models/fetch-of-pagination";
import type { PaginationParams } from "@/models/pagination-params";
import type { CreateUser, UserDetail } from "@/models/user";
import { prisma } from "../db";
import type { UserRepository } from "../repositories/user-repository";

export class PrismaUserRepository implements UserRepository {
	async create(data: CreateUser): Promise<{ userId: number }> {
		const newUser = await prisma.users.create({
			data,
		});

		const { id: userId } = newUser;

		return {
			userId,
		};
	}

	async findByCpf(cpf: string): Promise<{ user: UserDetail } | null> {
		const userWithCpf = await prisma.users.findUnique({
			where: {
				cpf,
			},
		});

		if (!userWithCpf) {
			return null;
		}

		const { id, created_at, email, is_active, name, updated_at } = userWithCpf;

		return {
			user: {
				id,
				cpf,
				createdAt: created_at!,
				email,
				isActive: is_active!,
				name,
				updatedAt: updated_at!,
			},
		};
	}

	async findById(id: number): Promise<{ user: UserDetail } | null> {
		const userWithId = await prisma.users.findUnique({
			where: {
				id,
			},
		});

		if (!userWithId) {
			return null;
		}

		const { cpf, created_at, email, is_active, name, updated_at } = userWithId;

		return {
			user: {
				id,
				cpf,
				createdAt: created_at!,
				email,
				isActive: is_active!,
				name,
				updatedAt: updated_at!,
			},
		};
	}

	async findAll(
		paginationParams: PaginationParams,
	): Promise<FetchOfPagination<UserDetail>> {
		const {
			page = 1,
			orderBy = "id",
			pageSize = 10,
			orderDirection = "desc",
		} = paginationParams;

		const [users, total] = await Promise.all([
			prisma.users.findMany({
				skip: (page - 1) * pageSize,
				take: pageSize,
				orderBy: {
					[orderBy]: orderDirection,
				},
			}),
			prisma.users.count(),
		]);

		const result: FetchOfPagination<UserDetail> = {
			data: users.map((user) => {
				const {
					id,
					cpf,
					created_at: createdAt,
					email,
					is_active: isActive,
					name,
					updated_at: updatedAt,
				} = user;
				return {
					id,
					cpf,
					createdAt: createdAt!,
					email,
					isActive: isActive!,
					name,
					updatedAt: updatedAt!,
				};
			}),
			orderBy,
			orderDirection,
			page,
			pageSize,
			total,
		};

		return result;
	}
}
