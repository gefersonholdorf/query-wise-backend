import type { Prisma } from "@prisma/client";
import type { ClientDetail, CreateClient } from "@/models/client";

export interface ClientRepository {
	create(
		data: CreateClient,
		tx?: Prisma.TransactionClient,
	): Promise<{ clientId: number }>;
	findById(
		id: number,
		tx?: Prisma.TransactionClient,
	): Promise<{ client: ClientDetail } | null>;
	findByPhone(
		phone: string,
		tx?: Prisma.TransactionClient,
	): Promise<{ client: ClientDetail } | null>;
}
