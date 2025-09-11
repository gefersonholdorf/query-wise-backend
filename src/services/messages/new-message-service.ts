import type { clients } from "@prisma/client";
import { prisma } from "@/databases/db";
import { PrismaClientRepository } from "@/databases/prisma/prisma-client-repository";
import { PrismaUserRepository } from "@/databases/prisma/prisma-user-repository";
import { UnexpectedError } from "@/errors/unexpected-error";
import { type Either, left, right } from "@/helpers/either";
import type { EvolutionMessageResponse } from "@/models/evolution-message-response";
import { sendMessageService } from "../bot/send-message-service";
import type { Service } from "../service";

export interface NewMessageServiceRequest {
	newMessage: EvolutionMessageResponse;
}

export type NewMessageServiceResponse = Either<
	UnexpectedError,
	{ messageId: number }
>;

export class NewMessageService
	implements Service<NewMessageServiceRequest, NewMessageServiceResponse>
{
	userRepository = new PrismaUserRepository();
	clientRepository = new PrismaClientRepository();

	async execute(
		serviceRequest: NewMessageServiceRequest,
	): Promise<NewMessageServiceResponse> {
		const { newMessage } = serviceRequest;

		const { remoteJid: phone, fromMe } = newMessage.data.key;
		const { pushName: name } = newMessage.data;
		const { text } = newMessage.data.message.extendedTextMessage;

		try {
			await prisma.$transaction(async (tx) => {
				const existingClientByPhone = await this.clientRepository.findByPhone(
					phone,
					tx,
				);
				let clientId = existingClientByPhone?.client.id;

				if (!existingClientByPhone) {
					const created = await this.clientRepository.create(
						{
							name,
							phone,
						},
						tx,
					);

					clientId = created.clientId;
				}

				const isOpenSession = await prisma.sessions.findMany({
					where: {
						client_id: clientId,
						AND: {
							ended_at: null,
						},
					},
				});
			});

			const isOpenSession = await prisma.sessions.findMany({
				where: {
					client_id: client?.id,
					AND: {
						ended_at: null,
					},
				},
			});

			let session = isOpenSession[0];

			if (isOpenSession.length === 0) {
				session = await prisma.sessions.create({
					data: {
						client_id: client.id,
					},
				});

				if (!fromMe) {
					await sendMessageService({
						message: text,
						phone,
					});
				}
			}

			const createMessage = await prisma.messages.create({
				data: {
					type: fromMe ? "sent" : "received",
					content: text,
					session_id: session.id,
				},
			});

			return right({
				messageId: createMessage.id,
			});
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				return left(new UnexpectedError(error));
			}

			return left(new UnexpectedError(new Error("Erro inesperado.")));
		}
	}
}
