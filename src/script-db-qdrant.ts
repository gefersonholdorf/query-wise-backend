import { QdrantClient } from "@qdrant/js-client-rest";
import { env } from "./env";

export interface OllamaEmbeddingResponse {
	embedding: number[];
}

const client = new QdrantClient({
	url: "http://localhost:6333",
});

async function createCollection() {
	await client.createCollection("knowledge_base", {
		vectors: { size: 1024, distance: "Cosine" },
	});

	console.log("Coleção criada com sucesso!");
}

async function getResults() {
	const response = await fetch(`${env.OLLAMA_API_URL}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: env.OLLAMA_EMBEDDING_MODEL,
			prompt: "Como eu cadastro uma nova apólice?",
		}),
	});

	if (!response.ok) {
		throw new Error(
			`Falha ao gerar embedding do texto: ${response.statusText}`,
		);
	}

	const data = (await response.json()) as OllamaEmbeddingResponse;

	const result = await client.search("knowledge_base", {
		vector: data.embedding,
	});
	console.log("List of collections:", result);
}

getResults();
