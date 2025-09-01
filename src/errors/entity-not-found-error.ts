/** biome-ignore-all lint/complexity/noUselessConstructor: <"explana"tion"> */
export class EntityNotFoundError extends Error {
	constructor(message: string) {
		super(message);
	}
}
