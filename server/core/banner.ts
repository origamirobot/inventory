import "reflect-metadata";
import { injectable } from "inversify";

export interface IBanner {

	show(): void;

}

@injectable()
export class Banner implements IBanner {


	public show(): void {

	}

}
