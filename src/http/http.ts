import type { FastifyInstance } from "fastify";
import { generateQRCodeRoute } from "./routes/bot/generate-qr-code-route";
import { logoutWhatsappRoute } from "./routes/bot/logout-whatsapp-route";
import { healthRoute } from "./routes/health";
import { createKnowledgeRoute } from "./routes/knowledge/create-knowledge-route";
import { deleteKnowledgeRoute } from "./routes/knowledge/delete-knowledge-route";
import { fetchKnowledgeRoute } from "./routes/knowledge/fetch-knowledges-route";
import { matchKnowledgeRoute } from "./routes/knowledge/match-knowledge-route";
import { updateKnowledgeByIdRoute } from "./routes/knowledge/update-knowledge-by-id-route";
import { newMessageRoute } from "./routes/messages/new-message";
import { createTagRoute } from "./routes/tags/create-tag-route";
import { fetchTagsRoute } from "./routes/tags/fetch-tags-route";

export function httpCreateRoute(app: FastifyInstance) {
	app.register(
		async (instance) => {
			instance.register(healthRoute);
			instance.register(createKnowledgeRoute);
			instance.register(matchKnowledgeRoute);
			instance.register(fetchKnowledgeRoute);
			instance.register(updateKnowledgeByIdRoute);
			instance.register(deleteKnowledgeRoute);

			instance.register(createTagRoute);
			instance.register(fetchTagsRoute);

			instance.register(generateQRCodeRoute);
			instance.register(logoutWhatsappRoute);

			instance.register(newMessageRoute);
		},
		{
			prefix: "/api/v1",
		},
	);
}
