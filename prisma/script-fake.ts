import { PrismaClient } from "@prisma/client";

export async function scriptFake() {
	const client = new PrismaClient();

	await client.knowledgeBaseTag.deleteMany();
	await client.tag.deleteMany();
	await client.knowledgeBase.deleteMany();

	await client.tag.createMany({
		data: [
			{ name: "Geral" },
			{ name: "Backend" },
			{ name: "Frontend" },
			{ name: "DevOps" },
			{ name: "Banco de Dados" },
			{ name: "Segurança" },
			{ name: "APIs" },
			{ name: "Autenticação" },
			{ name: "Deploy" },
			{ name: "Infraestrutura" },
			{ name: "Logs" },
			{ name: "Testes" },
		],
		skipDuplicates: true,
	});
}

scriptFake();
