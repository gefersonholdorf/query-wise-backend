export interface Client {
	id: number;
	name: string;
	phone: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateClient
	extends Omit<Client, "id" | "createdAt" | "updatedAt"> {}

export interface ClientDetail extends Client {}
