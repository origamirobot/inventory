import { BaseRepository } from './base.repository';
import { Location, PagedResult } from '../models';
import { inject, injectable } from 'inversify';
import { ILogger, IDatabase } from '../core';

@injectable()
export class LocationRepository extends BaseRepository<Location> {


	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('database') protected database: IDatabase){
		super(logger, database);
	}


	public async list(): Promise<Location[]> {
		try {
			this.logger.debug(`Getting Location records from the database`);
			var result = [] as Location[];
			var rows = this.database.db.prepare('SELECT [Id], [Name], [Description], [CreatedDate], [UpdatedDate] FROM [Locations]').all();
			
			for(let i = 0; i < rows.length; i++) {
				result.push(new Location(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async get(id: number): Promise<Location> {
		try {
			this.logger.debug(`Getting Location record ${id} from the database`);
			var row = this.database.db.prepare('SELECT [Id], [Name], [Description], [CreatedDate], [UpdatedDate] FROM [Locations] WHERE [Id] = ?').get(id);
			var result = new Location(row);
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async save(obj: Location): Promise<Location> { 
		try {
			if (obj.Id) {
				this.logger.debug(`Updating Location record ${obj.Id} in the database`);
				this.database.db
					.prepare(`UPDATE [Locations] SET [Name] = ?, [Description] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?`)
					.run(obj.Name, obj.Description, obj.Id);

				
			} else {
				this.logger.debug(`Creating new Location record in the database`);
				this.database.db
					.prepare('INSERT INTO [Locations] ([Name], [Description]) VALUES (?, ?)')
					.run(obj.Name, obj.Description);
				const result = this.database.db.prepare('SELECT [Id], [Description], [Name], [CreatedDate], [UpdatedDate] FROM [Locations] ORDER BY [Id] DESC LIMIT 1').get();
				return new Location(result);
			}
			return obj;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async delete(id: number): Promise<void> {  
		try {
			this.logger.debug(`Deleting Location record ${id} from the database`);
			this.database.db.prepare('DELETE FROM [Locations] WHERE [Id] = ?').run(id);
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}

}
