import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { GenerateQRCodeServiceService } from "@/services/bot/generate-qrcode-service";

export const generateQRCodeRoute: FastifyPluginCallbackZod = (app) => {
	const generateQRCodeService = new GenerateQRCodeServiceService();

	app.get(
		"/generate-qrcode",
		{
			schema: {
				tags: ["Bot"],
			},
		},
		async (_, reply) => {
			const resultService = await generateQRCodeService.execute();

			if (resultService.isLeft()) {
				return reply.status(400).send({
					message: resultService.value,
				});
			}

			const data = resultService.value;

			return reply.status(200).send({
				data,
			});
		},
	);
};
