import "reflect-metadata";
import { injectable } from "inversify";


export interface IDatabaseSettings {

	fileLocation: string;
	verbose: boolean;
	fileMustExist: boolean;
}

@injectable()
export class DatabaseSettings implements IDatabaseSettings {

	public fileLocation: string = '../../../devices.s3db';
	public fileMustExist: boolean = true;
	public verbose: boolean = true;

}
