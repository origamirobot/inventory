
export class ConnectionType {

	public Id: number;
	public Name: string;

	constructor(init?: Partial<ConnectionType>) {
		Object.assign(this, init);
	}

}
