import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { FetchUsersService } from "@/services/user/fetch-users-service";

export const fetchUsersRoute: FastifyPluginCallbackZod = (app) => {
	const fetchUsersService = new FetchUsersService();

	app.get(
		"/users",
		{
			schema: {
				summary: "Responsável por listar os usuários",
				description:
					"Este endpoint permite listar os usuário atráves de uma paginação.",
				tags: ["User"],
				querystring: z.object({
					page: z.coerce.number().optional(),
					pageSize: z.coerce.number().optional(),
					orderBy: z.string().optional(),
					orderDirection: z.enum(["asc", "desc"]),
				}),
				response: {
					201: z.object({
						data: z.array(
							z.object({
								id: z.number(),
								name: z.string(),
								email: z.string(),
								cpf: z.string(),
								isActive: z.boolean(),
								createdAt: z.date(),
								updatedAt: z.date(),
							}),
						),
						orderBy: z.string(),
						orderDirection: z.enum(["asc", "desc"]),
						page: z.number(),
						pageSize: z.number(),
						total: z.number(),
					}),
					500: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { page, pageSize, orderBy, orderDirection } = request.query;

			const result = await fetchUsersService.execute({
				page,
				pageSize,
				orderBy,
				orderDirection,
			});

			if (result.isLeft()) {
				return reply.status(500).send({ message: "Erro ao listar usuários" });
			}

			const { response } = result.value;

			return reply.status(201).send({
				data: response.data,
				orderBy: response.orderBy,
				orderDirection: response.orderDirection,
				page: response.page,
				pageSize: response.pageSize,
				total: response.total,
			});
		},
	);
};
