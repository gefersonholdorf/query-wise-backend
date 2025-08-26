import type { FastifyInstance } from "fastify";
import { healthRoute } from "./routes/health";

export function httpCreateRoute(app: FastifyInstance){
    app.register(async (instance) => {
        instance.register(healthRoute)
    }, {
        prefix: '/api/v1'
    })
}
