import type { FastifyInstance } from "fastify";
import { generateQRCodeRoute } from "./routes/bot/generate-qr-code-route";
import { logoutWhatsappRoute } from "./routes/bot/logout-whatsapp-route";
import { healthRoute } from "./routes/health";
import { createKnowledgeRoute } from "./routes/knowledge/create-knowledge-route";
// import { deleteKnowledgeRoute } from "./routes/knowledge/delete-knowledge-route";
// import { fetchKnowledgeRoute } from "./routes/knowledge/fetch-knowledges-route";
import { matchKnowledgeRoute } from "./routes/knowledge/match-knowledge-route";
// import { updateKnowledgeByIdRoute } from "./routes/knowledge/update-knowledge-by-id-route";
import { newMessageRoute } from "./routes/messages/new-message";
import { createUserRoute } from "./routes/user/create-user-route";
import { fetchUsersRoute } from "./routes/user/fetch-users-route";

export function httpCreateRoute(app: FastifyInstance) {
	app.register(
		async (instance) => {
			instance.register(healthRoute);
			instance.register(createKnowledgeRoute);
			instance.register(matchKnowledgeRoute);
			// instance.register(fetchKnowledgeRoute);
			// instance.register(updateKnowledgeByIdRoute);
			// instance.register(deleteKnowledgeRoute);

			instance.register(generateQRCodeRoute);
			instance.register(logoutWhatsappRoute);

			instance.register(newMessageRoute);

			instance.register(createUserRoute);
			instance.register(fetchUsersRoute);
		},
		{
			prefix: "/api/v1",
		},
	);
}
