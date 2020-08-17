import { BaseRepository } from './base.repository';
import { Connection, PagedResult } from '../models';
import { inject, injectable } from 'inversify';
import { ILogger, IDatabase } from '../core';
import { ConnectionType } from '../models/connectionType.model';

@injectable()
export class ConnectionRepository extends BaseRepository<Connection> {


	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('database') protected database: IDatabase){
		super(logger, database);
	}


	public async list(deviceId?: number): Promise<Connection[]> {
		try {
			this.logger.debug(`Getting Connection records from the database`);
			var result = [] as Connection[];
			var rows = [];
			if(deviceId != null) {
				rows = this.database.db.prepare('SELECT [Id], [Name], [ConnectionTypeId], [HostName], [DeviceId], [CreatedDate], [UpdatedDate], [MacAddress], [IpAddress] FROM [Connections] WHERE [DeviceId] = ?').all(deviceId);
			} else {
				rows = this.database.db.prepare('SELECT [Id], [Name], [ConnectionTypeId], [HostName], [DeviceId], [CreatedDate], [UpdatedDate], [MacAddress], [IpAddress] FROM [Connections]').all();
			}
			
			for(let i = 0; i < rows.length; i++) {
				result.push(new Connection(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async types(): Promise<ConnectionType[]> {
		try {
			this.logger.debug(`Getting Connection Type records from the database`);
			var result = [] as ConnectionType[];
			var rows = this.database.db.prepare('SELECT [Id], [Name] FROM [ConnectionTypes]').all();

			for(let i = 0; i < rows.length; i++) {
				result.push(new ConnectionType(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}

	public async get(id: number): Promise<Connection> {
		try {
			this.logger.debug(`Getting Connection record ${id} from the database`);
			var row = this.database.db.prepare('SELECT [Id], [Name], [ConnectionTypeId], [HostName], [DeviceId], [CreatedDate], [UpdatedDate], [MacAddress], [IpAddress] FROM [Connections] WHERE [Id] = ?').get(id);
			var result = new Connection(row);
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async save(obj: Connection): Promise<Connection> { 
		try {
			if (obj.Id) {
				this.logger.debug(`Updating Connection record ${obj.Id} in the database`);
				this.database.db
					.prepare(`UPDATE [Connections] SET [Name] = ?, [ConnectionTypeId] = ?, [HostName] = ?, [MacAddress] = ?, [IpAddress] = ?, [DeviceId] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?`)
					.run(obj.Name, obj.ConnectionTypeId, obj.HostName, obj.MacAddress, obj.IpAddress, obj.DeviceId, obj.Id);

				
			} else {
				this.logger.debug(`Creating new Connection record in the database`);
				this.database.db
					.prepare('INSERT INTO [Connections] ([Name], [ConnectionTypeId], [HostName], [MacAddress], [IpAddress], [DeviceId]) VALUES (?, ?, ?, ?, ?, ?)')
					.run(obj.Name, obj.ConnectionTypeId, obj.HostName, obj.MacAddress, obj.IpAddress, obj.DeviceId);
				const result = this.database.db.prepare('SELECT [Id], [ConnectionTypeId], [Name], [HostName], [DeviceId], [CreatedDate], [UpdatedDate], [MacAddress], [IpAddress] FROM [Connections] ORDER BY [Id] DESC LIMIT 1').get();
				return new Connection(result);
			}
			return obj;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async delete(id: number): Promise<void> {  
		try {
			this.logger.debug(`Deleting Connection record ${id} from the database`);
			this.database.db.prepare('DELETE FROM [Connections] WHERE [Id] = ?').run(id);
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}

}
