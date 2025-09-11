export interface EvolutionMessageResponse {
	event: string;
	instance: string;
	data: {
		key: {
			remoteJid: string;
			fromMe: boolean;
			id: string;
		};
		pushName: string;
		message: {
			extendedTextMessage: {
				text: string;
			};
		};
		contextInfo: null;
		messageType: string;
		messageTimestamp: number;
		owner: string;
		source: string;
	};
	destination: string;
	date_time: string;
	sender: string;
	server_url: string;
	apikey: string;
}
