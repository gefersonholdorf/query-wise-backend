/** biome-ignore-all lint/complexity/noUselessConstructor: <"explana"tion"> */
export class InvalidCredentialsError extends Error {
	constructor() {
		super("Invalid credentials.");
	}
}
