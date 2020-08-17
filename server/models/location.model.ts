
export class Location {

	public Id: number;
	public Name: string;
	public CreatedDate: Date;
	public UpdatedDate?: Date;
	public Description: string;

	constructor(init?:Partial<Location>) {
		Object.assign(this, init);
	}

}
