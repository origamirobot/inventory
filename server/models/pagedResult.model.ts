
export class PagedResult<T> {
	public results: T[];
	public pageIndex: number = 0;
	public pageNumber: number = 0;
	public pageSize: number = 0;
	public totalPages: number = 0;
	public totalResults: number;

	constructor(init?:Partial<PagedResult<T>>) {
		Object.assign(this, init);
	}

}
