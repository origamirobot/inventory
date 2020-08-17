import { BaseRepository } from './base.repository';
import { Field, PagedResult } from '../models';
import { inject, injectable } from 'inversify';
import { ILogger, IDatabase } from '../core';
import * as util from 'util';

@injectable()
export class FieldRepository extends BaseRepository<Field> {


	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('database') protected database: IDatabase){
		super(logger, database);
	}


	public async list(deviceId?: number): Promise<Field[]> {
		try {
			this.logger.debug(`Getting Field records from the database`);
			var result = [] as Field[];
			var rows = this.database.db.prepare('SELECT [Id], [Name], [Value], [DeviceId], [CreatedDate], [UpdatedDate], [Description] FROM [Fields] WHERE [DeviceId] = ?').all(deviceId);
			for(let i = 0; i < rows.length; i++) {
				result.push(new Field(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async get(id: number): Promise<Field> {
		try {
			this.logger.debug(`Getting Field record ${id} from the database`);
			var row = this.database.db.prepare('SELECT [Id], [Name], [Value], [DeviceId], [CreatedDate], [UpdatedDate], [Description] FROM [Fields] WHERE [Id] = ?').get(id);
			var result = new Field(row);
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async save(obj: Field): Promise<Field> { 
		try {
			if (obj.Id) {
				this.logger.debug(`Updating Field record ${obj.Id} in the database`);
				this.database.db
					.prepare(`UPDATE [Fields] SET [Name] = ?, [Description] = ?, [Value] = ?, [DeviceId] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?`)
					.run(obj.Name, obj.Description, obj.Value, obj.DeviceId, obj.Id);

				
			} else {
				this.logger.debug(`Creating new Connection record in the database`);
				this.database.db
					.prepare('INSERT INTO [Fields] ([Name], [Value], [Description], [DeviceId]) VALUES (?, ?, ?, ?)')
					.run(obj.Name, obj.Value, obj.Description, obj.DeviceId);
				const result = this.database.db.prepare('SELECT [Id], [Name], [Value], [DeviceId], [CreatedDate], [UpdatedDate], [Description] FROM [Fields] ORDER BY [Id] DESC LIMIT 1').get();
				return new Field(result);
			}
			return obj;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async delete(id: number): Promise<void> {  
		try {
			this.logger.debug(`Deleting Field record ${id} from the database`);
			this.database.db.prepare('DELETE FROM [Fields] WHERE [Id] = ?').run(id);
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}


}
