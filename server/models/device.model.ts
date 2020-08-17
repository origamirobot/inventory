
export class Device {

	public Id: number;
	public DefaultHostName: string;
	public ProductId: number;
	public LocationId: number;
	public ManufacturerId: number;
	public Name: string;
	public Notes: string;
	public CreatedDate: Date;
	public UpdatedDate?: Date;
	public SerialNumber: string;

	constructor(init?: Partial<Device>) {
		Object.assign(this, init);
	}

}
