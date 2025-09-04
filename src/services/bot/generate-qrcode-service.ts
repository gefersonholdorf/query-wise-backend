import { z } from "zod";
import { env } from "@/env";
import { type Either, left, right } from "../../helpers/either";
import type { Service } from "../service";

const QRCodeSchema = z.union([
	z.object({
		code: z.string(),
		base64: z.string(),
	}),
	z.object({
		instance: z.object({
			instanceName: z.string(),
			state: z.string(),
		}),
	}),
]);

export type EnvolutionGenerateQRCodeResponse = z.infer<typeof QRCodeSchema>;

export type GenerateQRCodeServiceServiceResponse = Either<
	Error,
	EnvolutionGenerateQRCodeResponse
>;

export class GenerateQRCodeServiceService
	implements Service<never, GenerateQRCodeServiceServiceResponse>
{
	async execute(): Promise<GenerateQRCodeServiceServiceResponse> {
		try {
			const resultEvolutionConnect = await fetch(
				`${env.EVOLUTION_URL}instance/connect/${env.EVOLUTION_INSTANCE_NAME}`,
				{
					method: "GET",
					headers: { apikey: env.EVOLUTION_APIKEY },
				},
			);

			if (!resultEvolutionConnect.ok) {
				return left(
					new Error(
						`Erro na requisição Evolution: ${resultEvolutionConnect.status} ${resultEvolutionConnect.statusText}`,
					),
				);
			}

			const json = await resultEvolutionConnect.json();
			const parsed = QRCodeSchema.safeParse(json);

			if (!parsed.success) {
				return left(new Error("Resposta inválida da Evolution API"));
			}

			// Tratar ambos os casos
			if ("code" in parsed.data && "base64" in parsed.data) {
				return right({ code: parsed.data.code, base64: parsed.data.base64 });
			} else if ("instance" in parsed.data) {
				return right({ instance: parsed.data.instance });
			} else {
				return left(new Error("Resposta inesperada da Evolution API"));
			}
		} catch (error) {
			return left(
				error instanceof Error
					? error
					: new Error("Erro desconhecido ao gerar QRCode"),
			);
		}
	}
}
