import type { Prisma } from "@prisma/client";
import type { ClientDetail, CreateClient } from "@/models/client";
import { prisma } from "../db";
import type { ClientRepository } from "../repositories/client-repository";

export class PrismaClientRepository implements ClientRepository {
	async create(
		data: CreateClient,
		tx?: Prisma.TransactionClient,
	): Promise<{ clientId: number }> {
		const db = tx ?? prisma;

		const client = await db.clients.create({
			data,
		});

		return { clientId: client.id };
	}

	async findById(
		id: number,
		tx?: Prisma.TransactionClient,
	): Promise<{ client: ClientDetail } | null> {
		const db = tx ?? prisma;

		const client = await db.clients.findUnique({
			where: {
				id,
			},
		});

		if (!client) {
			return null;
		}

		const clientDetail: ClientDetail = {
			id,
			name: client.name,
			phone: client.phone,
			createdAt: client.created_at,
			updatedAt: client.updated_at,
		};

		return {
			client: clientDetail,
		};
	}

	async findByPhone(
		phone: string,
		tx?: Prisma.TransactionClient,
	): Promise<{ client: ClientDetail } | null> {
		const db = tx ?? prisma;

		const client = await db.clients.findUnique({
			where: {
				phone,
			},
		});

		if (!client) {
			return null;
		}

		const clientDetail: ClientDetail = {
			id: client.id,
			name: client.name,
			phone: client.phone,
			createdAt: client.created_at,
			updatedAt: client.updated_at,
		};

		return {
			client: clientDetail,
		};
	}
}
