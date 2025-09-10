import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { EntityNotFoundError } from "@/errors/entity-not-found-error";
import { UpdateUserService } from "@/services/user/update-user-service";

export const updateUserRoute: FastifyPluginCallbackZod = (app) => {
	const updateUserService = new UpdateUserService();

	app.put(
		"/users/:id",
		{
			schema: {
				summary: "Responsável por atualizar um usuário pelo id",
				description: "Este endpoint permite atualizar um novo usuário por id.",
				tags: ["User"],
				body: z.object({
					name: z.string().optional(),
					isActive: z.boolean().optional(),
				}),
				params: z.object({
					id: z.coerce.number(),
				}),
				response: {
					201: z.object({
						userId: z.number(),
					}),
					404: z.object({
						message: z.string(),
					}),
					500: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { name, isActive } = request.body;
			const { id } = request.params;

			const result = await updateUserService.execute({
				id,
				name,
				isActive,
			});

			if (result.isLeft()) {
				const error = result.value;

				if (result.value instanceof EntityNotFoundError) {
					return reply.status(404).send({ message: error.message });
				}

				return reply.status(500).send({ message: "Erro inesperado." });
			}

			const { userId } = result.value;

			return reply.status(201).send({ userId });
		},
	);
};
