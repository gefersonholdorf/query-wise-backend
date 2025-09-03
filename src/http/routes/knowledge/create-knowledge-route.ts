// routes/knowledge/create-knowledge-route.ts
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateKnowledgeService } from "@/services/knowledge/create-knowledge-service";

export const createKnowledgeRoute: FastifyPluginCallbackZod = (app) => {
	const createKnowledgeService = new CreateKnowledgeService();

	app.post(
		"/knowledges",
		{
			schema: {
				tags: ["Knowledges"],
				summary: "Responsável por criar um conhecimento",
				description:
					"Este endpoint permite criar um novo conhecimento. É necessário informar os dados obrigatórios (problema, solução e as tags).",
				body: z.object({
					problem: z.string(),
					soluction: z.string(),
					tags: z.array(z.number()).min(1),
				}),
				response: {
					201: z.object({
						knowledgeId: z.number(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { problem, soluction, tags } = request.body;

			const serviceResponse = await createKnowledgeService.execute({
				problem,
				soluction,
				tags,
			});

			if (serviceResponse.isLeft()) {
				return reply
					.status(400)
					.send({ message: "Erro ao criar o conhecimento." });
			}

			const { knowledgeId } = serviceResponse.value;

			return reply.status(201).send({ knowledgeId });
		},
	);
};
