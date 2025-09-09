// import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
// import z from "zod/v4";
// import { FetchKnowledgeService } from "@/services/knowledge/fetch-knowledges-service";

// export const fetchKnowledgeRoute: FastifyPluginCallbackZod = (app) => {
// 	const fetchKnowledgeService = new FetchKnowledgeService();

// 	app.get(
// 		"/knowledges",
// 		{
// 			schema: {
// 				summary: "Responsável por listar os conhecimentos",
// 				tags: ["Knowledges"],
// 				description:
// 					"Este endpoint permite listar os conhecimentos através do (search e tagId).",
// 				querystring: z.object({
// 					search: z.string().optional(),
// 					tagId: z.coerce.number().optional(),
// 				}),
// 				response: {
// 					200: z.object({
// 						data: z.array(
// 							z.object({
// 								id: z.number(),
// 								problem: z.string(),
// 								soluction: z.string(),
// 								createdAt: z.date(),
// 								tags: z.array(
// 									z.object({
// 										id: z.number(),
// 										name: z.string(),
// 									}),
// 								),
// 							}),
// 						),
// 					}),
// 					400: z.object({
// 						message: z.string(),
// 					}),
// 				},
// 			},
// 		},
// 		async (request, reply) => {
// 			const { search, tagId } = request.query;

// 			const serviceResponse = await fetchKnowledgeService.execute({
// 				search,
// 				tagId,
// 			});

// 			if (serviceResponse.isLeft()) {
// 				return reply
// 					.status(400)
// 					.send({ message: "Erro ao obter as correspondências." });
// 			}

// 			const { knowledges: data } = serviceResponse.value;

// 			return reply.status(200).send({ data });
// 		},
// 	);
// };
