import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { UnexpectedError } from "@/errors/unexpected-error";
import { LoginService } from "@/services/auth/login-service";

export const loginRoute: FastifyPluginCallbackZod = (app) => {
	const loginService = new LoginService(app);

	app.post(
		"/login",
		{
			schema: {
				summary: "Responsável por realizar a autenticação no sistema",
				description:
					"Este endpoint permite o usuário realizar a autenticação através do CPF e a senha, gerando um token para utilizar em outras requisições que necessitam do mesmo.",
				tags: ["Auth"],
				body: z.object({
					cpf: z.string().min(1, "É necessário informar o cpf."),
					password: z.string().min(1, "É necessário informar a senha."),
				}),
				response: {
					200: z.object({
						token: z.string(),
					}),
					401: z.object({
						message: z.string(),
					}),
					500: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { cpf, password } = request.body;

			const responseService = await loginService.execute({
				cpf,
				password,
			});

			if (responseService.isLeft()) {
				if (responseService.value instanceof InvalidCredentialsError) {
					return reply.status(401).send({
						message: "Credenciais inválidas.",
					});
				}

				if (responseService.value instanceof UnexpectedError) {
					return reply.status(500).send({
						message: responseService.value.message,
					});
				}

				return reply.status(500).send({
					message: "Erro inesperado.",
				});
			}

			const { token } = responseService.value;

			return reply
				.setCookie("token", token, {
					httpOnly: true,
					signed: true,
					maxAge: 60 * 60 * 24, // 1 dia
				})
				.status(200)
				.send({
					token,
				});
		},
	);
};
