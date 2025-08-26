import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4"

export const healthRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/health', {
    }, async (request, reply) => {
        return reply.status(200).send({ status: 'up' })
    })
} 