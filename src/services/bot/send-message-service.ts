import { env } from "@/env";

export interface SendMessageServiceRequest {
	message: string;
	phone: string;
}

export async function sendMessageService(
	requestService: SendMessageServiceRequest,
) {
	const resultEvolutionConnect = await fetch(
		`${env.EVOLUTION_URL}message/sendText/${env.EVOLUTION_INSTANCE_NAME}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				apikey: env.EVOLUTION_APIKEY,
			},
			body: JSON.stringify({
				number: requestService.phone,
				textMessage: {
					text: requestService.message,
				},
			}),
		},
	);

	if (!resultEvolutionConnect.ok) {
		return new Error(
			`Erro na requisição Evolution: ${resultEvolutionConnect.status} ${resultEvolutionConnect.statusText}`,
		);
	}
}
