import type { FastifyInstance } from "fastify";
import { healthRoute } from "./routes/health";
import { createKnowledgeRoute } from "./routes/knowledge/create-knowledge-route";
import { deleteKnowledgeRoute } from "./routes/knowledge/delete-knowledge-route";
import { fetchKnowledgeRoute } from "./routes/knowledge/fetch-knowledges-route";
import { updateKnowledgeByIdRoute } from "./routes/knowledge/update-knowledge-by-id-route";
import { createTagRoute } from "./routes/tags/create-tag-route";
import { fetchTagsRoute } from "./routes/tags/fetch-tags-route";
// import { fetchKnowledgeRoute } from "./routes/knowledge/fetch-knowledges-route";
// import { matchKnowledgeRoute } from "./routes/knowledge/match-knowledge-route";

export function httpCreateRoute(app: FastifyInstance) {
	app.register(
		async (instance) => {
			instance.register(healthRoute);
			instance.register(createKnowledgeRoute);
			// instance.register(matchKnowledgeRoute);
			instance.register(fetchKnowledgeRoute);
			instance.register(updateKnowledgeByIdRoute);
			instance.register(deleteKnowledgeRoute);

			instance.register(createTagRoute);
			instance.register(fetchTagsRoute);
		},
		{
			prefix: "/api/v1",
		},
	);
}
