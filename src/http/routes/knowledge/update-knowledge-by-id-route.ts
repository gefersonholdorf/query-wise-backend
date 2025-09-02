import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { request } from "http";
import z from "zod/v4";
import { EntityNotFoundError } from "@/errors/entity-not-found-error";
import { UpdateKnowledgeByIdService } from "@/services/knowledge/update-knowledge-by-id-service";

export const updateKnowledgeByIdRoute: FastifyPluginCallbackZod = (app) => {
	const updateKnowledgeByIdService = new UpdateKnowledgeByIdService();

	app.put(
		"/knowledges/:id",
		{
			schema: {
				params: z.object({
					id: z.coerce.number(),
				}),
				body: z.object({
					problem: z.string().min(1),
					soluction: z.string().min(1),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const { problem, soluction } = request.body;

			const resultService = await updateKnowledgeByIdService.execute({
				id,
				problem,
				soluction,
			});

			if (resultService.isLeft()) {
				if (resultService.value instanceof EntityNotFoundError) {
					return reply.status(404).send({
						message: "Conhecimento não encontrado.",
					});
				}

				return reply.status(400).send({
					message: "Erro ao editar o conhecimento.",
				});
			}

			return reply.status(204).send({});
		},
	);
};
