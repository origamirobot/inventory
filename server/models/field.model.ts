
export class Field {

	public Id: number;
	public DeviceId: number;
	public Name: string;
	public Description: string;
	public Value: string;
	public CreatedDate: Date;
	public UpdatedDate?: Date;

	constructor(init?:Partial<Field>) {
		Object.assign(this, init);
	}

}
