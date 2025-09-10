import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	jsonSchemaTransformObject,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { httpCreateRoute } from "./http/http";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
	openapi: {
		openapi: "3.0.0",
		info: {
			title: "QueryWise",
			description: "Documentação oficial da aplicação QueryWise",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
	transformObject: jsonSchemaTransformObject,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(fastifyCors, {
	origin: true,
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});

app.register(fastifyCookie, {
	secret: env.COOKIE_SECRET_KEY,
	parseOptions: {
		httpOnly: true,
		secure: false, //Colocar true em produção para acessar somente com https
		// sameSite: "strict", //Colocar em produção para somente o front do mesmo dominio acessar
	},
});

app.register(fastifyJwt, {
	secret: env.SECRET_KEY,
	sign: { expiresIn: "1d" },
	cookie: {
		cookieName: "token",
		signed: true,
	},
});

httpCreateRoute(app);

app.listen({
	port: env.PORT,
});
