
export class Device {

	public Id: number;
	public DefaultHostName: string;
	public ModelNumber: string;
	public ProductId: number;
	public RoomId: number;
	public ManufacturerId: number;
	public Name: string;
	public Notes: string;
	public CreatedDate: Date;
	public UpdatedDate?: Date;
	public SerialNumber: string;
	public IsActive: boolean;

	constructor(init?: Partial<Device>) {
		Object.assign(this, init);
	}

}
