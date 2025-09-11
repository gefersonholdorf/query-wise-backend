import type { Prisma } from "@prisma/client";
import type { CreateSession, SessionDetail } from "@/models/session";

export interface SessionRepository {
	create(
		data: CreateSession,
		tx?: Prisma.TransactionClient,
	): Promise<{ SessionId: number }>;
	findActiveSessionByClientId(
		clientId: number,
		tx?: Prisma.TransactionClient,
	): Promise<{ Session: SessionDetail } | null>;
}
