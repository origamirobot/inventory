import "reflect-metadata";
import * as bsqlite3 from 'better-sqlite3';
import { inject, injectable } from 'inversify';
import { IServerSettings } from '../config/server.settings';
import { IDatabaseSettings } from '../config/database.settings';
import { ILogger } from './logger';
import * as path from 'path';


export interface IDatabase {

	db: bsqlite3.Database;
	connect(): void;
	disconnect(): void;

}

@injectable()
export class Database implements IDatabase {


	public db: bsqlite3.Database;


	constructor(
		@inject('serverSettings') private serverSettings: IServerSettings,
		@inject('databaseSettings') private databaseSettings: IDatabaseSettings,
		@inject('logger') private logger: ILogger) {
			
	}

	public connect(): void {

		var location = path.join(__dirname, this.databaseSettings.fileLocation);
		this.logger.debug(`Attaching database from ${location}`);

		this.db = new bsqlite3(location, { fileMustExist: this.databaseSettings.fileMustExist, verbose: console.log});
	}

	public disconnect(): void {
		this.db.close();
	}


}
