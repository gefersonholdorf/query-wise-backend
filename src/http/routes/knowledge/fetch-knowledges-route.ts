import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { FetchKnowledgeService } from "@/services/knowledge/fetch-knowledges-service";

export const fetchKnowledgeRoute: FastifyPluginCallbackZod = (app) => {
	const fetchKnowledgeService = new FetchKnowledgeService();

	app.get(
		"/knowledges",
		{
			schema: {
				querystring: z.object({
					search: z.string().optional(),
					tagId: z.coerce.number().optional(),
				}),
			},
		},
		async (request, reply) => {
			const { search, tagId } = request.query;

			const serviceResponse = await fetchKnowledgeService.execute({
				search,
				tagId,
			});

			if (serviceResponse.isLeft()) {
				return reply
					.status(400)
					.send({ message: "Erro ao obter as correspondências." });
			}

			const { knowledges: data } = serviceResponse.value;

			return reply.status(200).send({ data });
		},
	);
};
