
export class Room {

	public Id: number;
	public Name: string;
	public CreatedDate: Date;
	public UpdatedDate?: Date;
	public Description: string;

	constructor(init?:Partial<Room>) {
		Object.assign(this, init);
	}

}
