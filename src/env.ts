import z from "zod/v4";
import "dotenv/config";

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	OLLAMA_API_URL: z.url(),
	OLLAMA_EMBEDDING_MODEL: z.string().default("mxbai-embed-large"),
	EVOLUTION_URL: z.url(),
	EVOLUTION_INSTANCE_NAME: z.string(),
	EVOLUTION_APIKEY: z.string(),
	QDRANT_URL: z.url(),
});

export const env = envSchema.parse(process.env);
