import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { FetchTagsService } from "@/services/tags/fetch-tags-service";

export const fetchTagsRoute: FastifyPluginCallbackZod = async (app) => {
	const fetchTagsService = new FetchTagsService();

	app.get("/tags", async (__, reply) => {
		const tags = await fetchTagsService.execute();

		if (tags.isLeft()) {
			return reply.status(400).send({ message: "Erro ao listar as tags." });
		}

		const { fetchTags: data } = tags.value;

		return reply.status(200).send({ data });
	});
};
