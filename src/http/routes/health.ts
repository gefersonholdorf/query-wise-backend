import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

export const healthRoute: FastifyPluginCallbackZod = (app) => {
	app.get("/health", {}, async (_, reply) => {
		return reply.status(200).send({ status: "up" });
	});
};
