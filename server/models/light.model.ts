import { Manufacturer } from './manufacturer.model';
import { Room } from './room.model';

export class Light {

	public Id: number;
	public Name: string;
	public ModelNumber: string;
	public ModelName: string;
	public ManufacturerId: number;
	public Manufacturer: Manufacturer;
	public Room: Room;
	public RoomId: number;
	public SW: string;
	public CreatedDate: string;
	public UpdatedDate: string;

	constructor(init?: Partial<Light>) {
		Object.assign(this, init);
	}
}
