import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { CreateTagService } from "@/services/tags/create-tag-service";

export const createTagRoute: FastifyPluginCallbackZod = async (app) => {
	const createTagService = new CreateTagService();

	app.post(
		"/tags",
		{
			schema: {
				tags: ["Tags"],
				summary: "Responsável por criar uma tag",
				description:
					"Este endpoint permite criar uma nova tag no sistema. É necessário informar os dados obrigatórios (nome).",
				body: z.object({
					name: z.string(),
				}),
				response: {
					201: z.object({
						tagId: z.number(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { name } = request.body;

			const serviceResponse = await createTagService.execute({
				name,
			});

			if (serviceResponse.isLeft()) {
				return reply.status(400).send({
					message: "Erro ao adicionar nova tag.",
				});
			}

			const { tagId } = serviceResponse.value;

			return reply.status(201).send({
				tagId,
			});
		},
	);
};
