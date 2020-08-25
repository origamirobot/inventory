import { BaseRepository } from './base.repository';
import { Room, PagedResult } from '../models';
import { inject, injectable } from 'inversify';
import { ILogger, IDatabase } from '../core';

@injectable()
export class RoomRepository extends BaseRepository<Room> {


	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('database') protected database: IDatabase){
		super(logger, database);
	}


	public async list(): Promise<Room[]> {
		try {
			this.logger.debug(`Getting Room records from the database`);
			var result = [] as Room[];
			var rows = this.database.db.prepare('SELECT [Id], [Name], [Description], [CreatedDate], [UpdatedDate] FROM [Rooms]').all();
			
			for(let i = 0; i < rows.length; i++) {
				result.push(new Room(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async get(id: number): Promise<Room> {
		try {
			this.logger.debug(`Getting Room record ${id} from the database`);
			var row = this.database.db.prepare('SELECT [Id], [Name], [Description], [CreatedDate], [UpdatedDate] FROM [Rooms] WHERE [Id] = ?').get(id);
			var result = new Room(row);
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async save(obj: Room): Promise<Room> { 
		try {
			if (obj.Id) {
				this.logger.debug(`Updating Room record ${obj.Id} in the database`);
				this.database.db
					.prepare(`UPDATE [Rooms] SET [Name] = ?, [Description] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?`)
					.run(obj.Name, obj.Description, obj.Id);

				
			} else {
				this.logger.debug(`Creating new Room record in the database`);
				this.database.db
					.prepare('INSERT INTO [Rooms] ([Name], [Description]) VALUES (?, ?)')
					.run(obj.Name, obj.Description);
				const result = this.database.db.prepare('SELECT [Id], [Description], [Name], [CreatedDate], [UpdatedDate] FROM [Rooms] ORDER BY [Id] DESC LIMIT 1').get();
				return new Room(result);
			}
			return obj;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async delete(id: number): Promise<void> {  
		try {
			this.logger.debug(`Deleting Room record ${id} from the database`);
			this.database.db.prepare('DELETE FROM [Rooms] WHERE [Id] = ?').run(id);
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}

}
