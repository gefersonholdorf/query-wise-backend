import { PrismaClient } from "@prisma/client";

export const createDatabase = [
	`CREATE TABLE users (
		id INT PRIMARY KEY AUTO_INCREMENT,
		name VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL UNIQUE,
		cpf VARCHAR(14) NOT NULL UNIQUE,
		password VARCHAR(255) NOT NULL,
		is_active BOOLEAN DEFAULT TRUE,
		created_at TIMESTAMP DEFAULT NOW(),
		updated_at TIMESTAMP DEFAULT NOW()
	);`,
];

const prisma = new PrismaClient();

async function executeDB() {
	try {
		for (const query of createDatabase) {
			await prisma.$executeRawUnsafe(query);
			console.log("Query executada com sucesso");
		}
	} catch (error) {
		console.error("Erro ao executar SQL via Prisma:", error);
	} finally {
		await prisma.$disconnect();
	}
}

executeDB();
