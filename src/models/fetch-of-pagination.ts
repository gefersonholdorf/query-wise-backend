export interface FetchOfPagination<Entity> {
	data: Entity[];
	total: number;
	page: number;
	pageSize: number;
	orderBy: string;
    orderDirection: 'asc' | 'desc'
}
