import type { Tag } from "./tag";

export interface Knowledge {
	id: number;
	problem: string;
	soluction: string;
	tags: Tag[];
	embedding: number[];
	createdAt: Date;
	updatedAt: Date;
}
[];
