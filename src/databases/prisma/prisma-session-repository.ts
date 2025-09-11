import type { Prisma } from "@prisma/client";
import type { CreateSession, SessionDetail } from "@/models/session";
import { prisma } from "../db";
import type { SessionRepository } from "../repositories/session-repository";

export class PrismaSessionRepository implements SessionRepository {
	async create(
		data: CreateSession,
		tx?: Prisma.TransactionClient,
	): Promise<{ SessionId: number }> {
		const db = tx ?? prisma;

		const Session = await db.sessions.create({
			data: {
				client_id: data.clientId,
			},
		});

		return { SessionId: Session.id };
	}

	async findActiveSessionByClientId(
		clientId: number,
		tx?: Prisma.TransactionClient,
	): Promise<{ Session: SessionDetail } | null> {
		throw new Error("Method not implemented.");
	}
}
