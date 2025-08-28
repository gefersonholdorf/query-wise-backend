// import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
// import z from "zod/v4";
// import { MatchKnowledgeService } from "@/services/knowledge/match-knowledge-service";

// export const matchKnowledgeRoute: FastifyPluginCallbackZod = (app) => {
// 	const matchKnowledgeService = new MatchKnowledgeService();

// 	app.post(
// 		"/knowledges/match",
// 		{
// 			schema: {
// 				body: z.object({
// 					message: z.string(),
// 				}),
// 			},
// 		},
// 		async (request, reply) => {
// 			const { message } = request.body;

// 			const serviceResponse = await matchKnowledgeService.execute({
// 				message,
// 			});

// 			if (serviceResponse.isLeft()) {
// 				return reply
// 					.status(400)
// 					.send({ message: "Erro ao obter as correspondências." });
// 			}

// 			const { bestMatchs } = serviceResponse.value;

// 			return reply.status(200).send({ bestMatchs });
// 		},
// 	);
// };
