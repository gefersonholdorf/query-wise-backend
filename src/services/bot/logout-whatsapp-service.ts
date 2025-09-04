import { env } from "@/env";
import { type Either, left, right } from "../../helpers/either";
import type { Service } from "../service";

export interface EvolutionLogoutWhatsapp {
	status: string;
	error: boolean;
	response: {
		message: string;
	};
}

export type LogoutWhatsappServiceServiceResponse = Either<
	Error,
	{
		status: string;
		error: boolean;
		response: {
			message: string;
		};
	}
>;

export class LogoutWhatsappServiceService
	implements Service<never, LogoutWhatsappServiceServiceResponse>
{
	async execute(): Promise<LogoutWhatsappServiceServiceResponse> {
		try {
			const resultEvolutionConnect = await fetch(
				`${env.EVOLUTION_URL}instance/logout/${env.EVOLUTION_INSTANCE_NAME}`,
				{
					method: "DELETE",
					headers: { apikey: env.EVOLUTION_APIKEY },
				},
			);

			const responseEvolutionConnect: EvolutionLogoutWhatsapp =
				(await resultEvolutionConnect.json()) as EvolutionLogoutWhatsapp;

			const { response, error, status } = responseEvolutionConnect;

			return right({
				status,
				error,
				response,
			});
		} catch (error) {
			return left(
				error instanceof Error
					? error
					: new Error("Erro desconhecido ao realizar logout."),
			);
		}
	}
}
