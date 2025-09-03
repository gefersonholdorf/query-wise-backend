import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { MatchKnowledgeService } from "@/services/knowledge/match-knowledge-service";

export const matchKnowledgeRoute: FastifyPluginCallbackZod = (app) => {
	const matchKnowledgeService = new MatchKnowledgeService();

	app.post(
		"/knowledges/match",
		{
			schema: {
				summary:
					"Responsável por verificar a similaridade de uma mensagem com os conhecimentos ja cadastrados",
				tags: ["Knowledges"],
				description:
					"Este endpoint permite verificar a similaridade de uma mensagem com os conhecimentos ja cadastrados no sistema retornando os conhecimento mais próximos realizado através de um cálculo de similaridades com embeddings.",
				body: z.object({
					message: z.string(),
				}),
				response: {
					200: z.object({
						bestMatchs: z.array(
							z.object({
								id: z.number(),
								problem: z.string(),
								soluction: z.string(),
								similarity: z.number(),
							}),
						),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { message } = request.body;

			const serviceResponse = await matchKnowledgeService.execute({
				message,
			});

			if (serviceResponse.isLeft()) {
				return reply
					.status(400)
					.send({ message: "Erro ao obter as correspondências." });
			}

			const { bestMatchs } = serviceResponse.value;

			return reply.status(200).send({ bestMatchs });
		},
	);
};
