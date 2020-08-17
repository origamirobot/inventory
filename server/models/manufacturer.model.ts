
export class Manufacturer {

	public Id: number;
	public Name: string;
	public Url: string;
	public CreatedDate: Date;
	public UpdatedDate?: Date;


	constructor(init?:Partial<Manufacturer>) {
		Object.assign(this, init);
	}

}
