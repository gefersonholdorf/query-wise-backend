import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { ExistingEntityError } from "@/errors/existing-entity-error";
import { authenticate } from "@/middlewares/autenticate";
import { CreateUserService } from "@/services/user/create-user-service";

export const createUserRoute: FastifyPluginCallbackZod = (app) => {
	const createUserService = new CreateUserService();

	app.post(
		"/users",
		{
			preHandler: authenticate,
			schema: {
				summary: "Responsável por criar um novo usuário",
				description:
					"Este endpoint permite criar um novo usuário. É necessário informar todos os dados obrigatórios.",
				tags: ["User"],
				body: z.object({
					name: z.string(),
					email: z.email(),
					cpf: z.string(),
					password: z
						.string()
						.min(3, "A senha deve conter no mínimo 3 caracteres"),
				}),
				response: {
					201: z.object({
						userId: z.number(),
					}),
					409: z.object({
						message: z.string(),
					}),
					500: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { name, email, cpf, password } = request.body;
			console.log(request.user);

			const result = await createUserService.execute({
				name,
				email,
				cpf,
				password,
			});

			if (result.isLeft()) {
				const error = result.value;

				if (result.value instanceof ExistingEntityError) {
					return reply.status(409).send({ message: error.message });
				}

				return reply.status(500).send({ message: "Erro inesperado." });
			}

			const { userId } = result.value;

			return reply.status(201).send({ userId });
		},
	);
};
