

export class Product {

	public Id: number;
	public Name: string;
	public ManufacturerId: number;
	public CreatedDate: Date;
	public UpdatedDate?: Date;
	public Url: string;

	constructor(init?:Partial<Product>) {
		Object.assign(this, init);
	}


}
