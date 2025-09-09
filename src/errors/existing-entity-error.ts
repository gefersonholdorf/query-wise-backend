/** biome-ignore-all lint/complexity/noUselessConstructor: <"explana"tion"> */
export class ExistingEntityError extends Error {
	constructor(msg: string) {
		super(msg);
	}
}
