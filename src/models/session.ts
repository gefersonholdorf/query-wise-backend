export interface Session {
	id: number;
	clientId: number;
	startedAt: Date;
	endedAt: Date;
	ragEnabled: boolean;
	greetingSent: boolean;
}

export interface CreateSession
	extends Omit<
		Session,
		"id" | "startedAt" | "endedAt" | "ragEnabled" | "greetingSent"
	> {}

export interface SessionDetail extends Session {}
