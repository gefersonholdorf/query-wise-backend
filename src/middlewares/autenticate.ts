import type { FastifyReply, FastifyRequest } from "fastify";

export const authenticate = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const payload = (await request.jwtVerify()) as { userId: number };
		request.auth = { userId: payload.userId };
	} catch (err) {
		console.error(err);
		return reply.status(401).send({ error: "Token inválido ou ausente" });
	}
};
