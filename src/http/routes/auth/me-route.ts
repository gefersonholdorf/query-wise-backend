import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { EntityNotFoundError } from "@/errors/entity-not-found-error";
import { authenticate } from "@/middlewares/autenticate";
import { MeService } from "@/services/auth/me-service";

export const meRoute: FastifyPluginCallbackZod = (app) => {
	const meService = new MeService();

	app.get(
		"/me",
		{
			preHandler: authenticate,
			schema: {
				summary: "Responsável por listar o usuário autenticado",
				description:
					"Este endpoint permite listar o usuário atual autenticado.",
				tags: ["Auth"],
				response: {
					200: z.object({
						user: z.object({
							id: z.number(),
							name: z.string(),
							email: z.string(),
							cpf: z.string(),
							isActive: z.boolean(),
							createdAt: z.date(),
							updatedAt: z.date(),
						}),
					}),
					401: z.object({
						message: z.string(),
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
			const { userId } = request.auth;

			const responseService = await meService.execute({
				userId,
			});

			if (responseService.isLeft()) {
				if (responseService.value instanceof EntityNotFoundError) {
					return reply.status(404);
				}

				return reply.status(500).send({
					message: responseService.value.message,
				});
			}

			const { user } = responseService.value;

			return reply.status(200).send({
				user,
			});
		},
	);
};
