import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { prisma } from "@/databases/db";
import { EntityNotFoundError } from "@/errors/entity-not-found-error";
import { DeleteKnowledgeService } from "@/services/knowledge/delete-knowledge-service";

export const deleteKnowledgeRoute: FastifyPluginCallbackZod = async (app) => {
	const deleteKnowledgeService = new DeleteKnowledgeService();

	app.delete(
		"/knowledges/:id",
		{
			schema: {
				summary: "Responsável por deletar um conhecimento",
				tags: ["Knowledges"],
				description:
					"Este endpoint permite remover um conhecimento através do id.",
				params: z.object({
					id: z.coerce.number(),
				}),
				response: {
					204: z.object({}),
					400: z.object({
						message: z.string(),
					}),
					404: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			const resultService = await deleteKnowledgeService.execute({
				id,
			});

			if (resultService.isLeft()) {
				if (resultService.value instanceof EntityNotFoundError) {
					return reply.status(404).send({
						message: "Conhecimento não encontrado.",
					});
				}

				return reply.status(400).send({
					message: "Erro ao deletar um conhecimento.",
				});
			}

			return reply.status(204).send({});
		},
	);
};
