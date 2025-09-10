export interface User {
	id: number;
	name: string;
	email: string;
	cpf: string;
	password: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateUser
	extends Omit<User, "id" | "isActive" | "createdAt" | "updatedAt"> {}

export interface UserDetail extends Omit<User, "password"> {}

export interface UpdatedUser
	extends Omit<
		User,
		"createdAt" | "updatedAt" | "cpf" | "email" | "password"
	> {}
