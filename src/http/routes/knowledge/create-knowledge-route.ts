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
				body: z.object({
					problem: z.string(),
					soluction: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { problem, soluction } = request.body;

			const serviceResponse = await createKnowledgeService.execute({
				problem,
				soluction,
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
