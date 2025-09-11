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

	`CREATE TABLE clients (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		phone VARCHAR(50) NOT NULL UNIQUE,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL		
	);`,

	`CREATE TABLE sessions (
		id INT AUTO_INCREMENT PRIMARY KEY,
		client_id INT NOT NULL,
		started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		ended_at DATETIME NULL,
		rag_enabled BOOLEAN DEFAULT TRUE,
		greeting_sent BOOLEAN DEFAULT FALSE,
		FOREIGN KEY (client_id) REFERENCES clients(id)
	);`,

	`CREATE TABLE messages (
		id INT AUTO_INCREMENT PRIMARY KEY,
		session_id INT NOT NULL,
		content TEXT NOT NULL,
		type ENUM('received','sent') NOT NULL,
		status ENUM('pending','answered','not_found') DEFAULT 'pending',
		response_id INT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
		FOREIGN KEY (session_id) REFERENCES sessions(id)
	);`,

	`CREATE TABLE responses (
		id INT AUTO_INCREMENT PRIMARY KEY,
		content TEXT NOT NULL,
		source ENUM('RAG','operator') NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
	);`,

	`CREATE TABLE operator_logs (
		id INT AUTO_INCREMENT PRIMARY KEY,
		operator_id INT NOT NULL,
		message_id INT NOT NULL,
		action ENUM('answered','updated','ignored') NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (operator_id) REFERENCES users(id)
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
