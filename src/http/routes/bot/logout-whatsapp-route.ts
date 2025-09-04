import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { LogoutWhatsappServiceService } from "@/services/bot/logout-whatsapp-service";

export const logoutWhatsappRoute: FastifyPluginCallbackZod = (app) => {
	const logoutWhatsappService = new LogoutWhatsappServiceService();

	app.delete(
		"/logout-whatsapp",
		{
			schema: {
				tags: ["Bot"],
			},
		},
		async (_, reply) => {
			const resultService = await logoutWhatsappService.execute();

			if (resultService.isLeft()) {
				return reply.status(400).send({
					message: resultService.value,
				});
			}

			const { status, error, response } = resultService.value;

			return reply.status(200).send({
				status,
				error,
				response,
			});
		},
	);
};
