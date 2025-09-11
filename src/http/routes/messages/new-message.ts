import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import type { EvolutionMessageResponse } from "@/models/evolution-message-response";
import { NewMessageService } from "@/services/messages/new-message-service";

export const newMessageRoute: FastifyPluginCallbackZod = (app) => {
	const newMessageService = new NewMessageService();

	app.post(
		"/messages",
		{
			schema: {
				summary: "Responsável por receber as mensagens do whatsapp",
				description:
					"Este endpoint permite receber as mensagens que vem do whatsapp e realizar todas as operações de registro necessário.",
				tags: ["Message"],
				response: {
					200: z.object({}),
				},
			},
		},
		async (request, reply) => {
			const body = request.body as EvolutionMessageResponse;

			const resultService = newMessageService.execute({
				newMessage: body,
			});

			reply.status(200).send({});
		},
	);
};
