import { PrismaClient } from "@prisma/client";
import { QdrantClient } from "@qdrant/js-client-rest";
import { env } from "@/env";

export const prisma = new PrismaClient({
	log: ["error", "info", "warn"],
});

export const qdrant = new QdrantClient({
	url: env.QDRANT_URL,
});
