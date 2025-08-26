import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { env } from "./env";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { httpCreateRoute } from "./http/http";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors)

httpCreateRoute(app)

app.listen({
    port: env.PORT
})