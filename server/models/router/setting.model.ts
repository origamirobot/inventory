
export class Setting {

	public key: string;
	public value: string;

	constructor(init?:Partial<Setting>){
		Object.assign(this,init);
	}

}
