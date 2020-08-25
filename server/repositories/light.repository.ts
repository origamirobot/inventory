import { BaseRepository } from './base.repository';
import { Light, PagedResult } from '../models';
import { inject, injectable } from 'inversify';
import { ILogger, IDatabase } from '../core';

@injectable()
export class LightRepository extends BaseRepository<Light> {


	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('database') protected database: IDatabase){
		super(logger, database);
	}


	public async list(): Promise<Light[]> {
		try {
			this.logger.debug(`Getting Light records from the database`);
			var result = [] as Light[];
			var rows = this.database.db.prepare('SELECT [Id], [Name], [ModelNumber], [ModelName], [ManufacturerId], [RoomId], [SW], [CreatedDate], [UpdatedDate] FROM [Lights]').all();
			
			for(let i = 0; i < rows.length; i++) {
				result.push(new Light(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async get(id: number): Promise<Light> {
		try {
			this.logger.debug(`Getting Light record ${id} from the database`);
			var row = this.database.db.prepare('SELECT [Id], [Name], [ModelNumber], [ModelName], [ManufacturerId], [RoomId], [SW], [CreatedDate], [UpdatedDate] FROM [Lights] WHERE [Id] = ?').get(id);
			var result = new Light(row);
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async save(obj: Light): Promise<Light> { 
		try {
			if (obj.Id) {
				this.logger.debug(`Updating Light record ${obj.Id} in the database`);
				this.database.db
					.prepare(`UPDATE [Lights] SET [Name] = ?, [ModelNumber] = ?, [ModelName] = ?, [RoomId] = ?, [SW] = ?, [ManufacturerId] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?`)
					.run(obj.Name, obj.ModelNumber, obj.ModelName, obj.RoomId, obj.SW, obj.ManufacturerId, obj.Id);

				
			} else {
				this.logger.debug(`Creating new Room record in the database`);
				this.database.db
					.prepare('INSERT INTO [Lights] ([Name], [ModelNumber], [ModelName], [RoomId], [SW], [ManufacturerId]) VALUES (?, ?, ?, ?, ?, ?)')
					.run(obj.Name, obj.ModelNumber, obj.ModelName, obj.RoomId, obj.SW, obj.ManufacturerId);
				const result = this.database.db.prepare('SELECT [Id], [Name], [ModelNumber], [ModelName], [ManufacturerId], [RoomId], [SW], [CreatedDate], [UpdatedDate] FROM [Lights] ORDER BY [Id] DESC LIMIT 1').get();
				return new Light(result);
			}
			return obj;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async delete(id: number): Promise<void> {  
		try {
			this.logger.debug(`Deleting Light record ${id} from the database`);
			this.database.db.prepare('DELETE FROM [Lights] WHERE [Id] = ?').run(id);
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}

}
