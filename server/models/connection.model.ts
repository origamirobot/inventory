
export class Connection {

	public Id: number;
	public DeviceId: number;
	public Name: string;
	public IpAddress: string;
	public MacAddress: string;
	public HostName: string;
	public CreatedDate: Date;
	public UpdatedDate?: Date;
	public ConnectionTypeId: number;

	constructor(init?:Partial<Connection>) {
		Object.assign(this, init);
	}

}
