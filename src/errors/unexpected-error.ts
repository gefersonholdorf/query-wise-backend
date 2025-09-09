/** biome-ignore-all lint/complexity/noUselessConstructor: <"explana"tion"> */
export class UnexpectedError extends Error {
	constructor(err: Error) {
		super("", err);
	}
}
