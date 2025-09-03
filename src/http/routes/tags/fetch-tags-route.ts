import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { FetchTagsService } from "@/services/tags/fetch-tags-service";

export const fetchTagsRoute: FastifyPluginCallbackZod = async (app) => {
	const fetchTagsService = new FetchTagsService();

	app.get(
		"/tags",
		{
			schema: {
				tags: ["Tags"],
				summary: "Responsável por listar as tags",
				description:
					"Este endpoint permite listar todas as tags e sua quantidade de conhecimentos.",
				response: {
					400: z.object({
						message: z.string(),
					}),
					200: z.object({
						data: z.array(
							z.object({
								id: z.number(),
								name: z.string(),
								quantity: z.number(),
							}),
						),
					}),
				},
			},
		},
		async (__, reply) => {
			const tags = await fetchTagsService.execute();

			if (tags.isLeft()) {
				return reply.status(400).send({ message: "Erro ao listar as tags." });
			}

			const { fetchTags: data } = tags.value;

			return reply.status(200).send({ data });
		},
	);
};
