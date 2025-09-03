import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";

export const healthRoute: FastifyPluginCallbackZod = (app) => {
	app.get(
		"/health",
		{
			schema: {
				tags: ["Health"],
				description:
					"Este endpoint é responsável por informar a saúde da aplicação.",
				summary: "Verifica a saúde da aplicação.",
				response: {
					200: z.object({
						status: z.string(),
					}),
				},
			},
		},
		async (_, reply) => {
			return reply.status(200).send({ status: "up" });
		},
	);
};
