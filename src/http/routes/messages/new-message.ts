import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

export const newMessageRoute: FastifyPluginCallbackZod = (app) => {
	app.post("/messages", {}, async (request, reply) => {
		console.log(request.body);
		console.log("recebi");

		reply.status(200).send({
			message: request.body,
		});
	});
};
