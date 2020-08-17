import { BaseRepository } from './base.repository';
import { Manufacturer, PagedResult } from '../models';
import { inject, injectable } from 'inversify';
import { ILogger, IDatabase } from '../core';
import * as util from 'util';

@injectable()
export class ManufacturerRepository extends BaseRepository<Manufacturer> {


	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('database') protected database: IDatabase){
		super(logger, database);
	}


	public async list(): Promise<Manufacturer[]> {
		try {
			this.logger.debug(`Getting Manufacturer records from the database`);
			var result = [] as Manufacturer[];
			var rows = this.database.db.prepare('SELECT [Id], [Name], [Url], [CreatedDate], [UpdatedDate] FROM [Manufacturers] ORDER BY [Name]').all();
			for(let i = 0; i < rows.length; i++) {
				result.push(new Manufacturer(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async get(id: number): Promise<Manufacturer> {
		try {
			this.logger.debug(`Getting Manufacturer record ${id} from the database`);
			var row = this.database.db.prepare('SELECT [Id], [Name], [Url], [CreatedDate], [UpdatedDate] FROM [Manufacturers] WHERE [Id] = ?').get(id);
			var result = new Manufacturer(row);
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async save(obj: Manufacturer): Promise<Manufacturer> { 
		try {
			if (obj.Id) {
				this.logger.debug(`Updating Manufacturer record ${obj.Id} in the database`);
				this.database.db
					.prepare(`UPDATE [Manufacturers] SET [Name] = ?, [Url] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?`)
					.run(obj.Name, obj.Url, obj.Id);

				
			} else {
				this.logger.debug(`Creating new Manufacturer record in the database`);
				this.database.db
					.prepare('INSERT INTO [Manufacturers] ([Name], [Url]) VALUES (?, ?)')
					.run(obj.Name, obj.Url);
				const result = this.database.db.prepare('SELECT [Id], [Name], [Url], [CreatedDate], [UpdatedDate] FROM [Manufacturers] ORDER BY [Id] DESC LIMIT 1').get();
				return new Manufacturer(result);
			}
			return obj;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async delete(id: number): Promise<void> {  
		try {
			this.logger.debug(`Deleting Manufacturer record ${id} from the database`);
			this.database.db.prepare('DELETE FROM [Manufacturers] WHERE [Id] = ?').run(id);
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}


}
