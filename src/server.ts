import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import { env } from "./env";
import { httpCreateRoute } from "./http/http";
import {
    serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import z from "zod/v4";
import { ZodTypeProvider } from "fastify-type-provider-zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors);

httpCreateRoute(app);

app.listen({
	port: env.PORT,
});
