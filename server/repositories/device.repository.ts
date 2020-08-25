import { BaseRepository } from './base.repository';
import { Device } from '../models';
import { inject, injectable } from 'inversify';
import { ILogger, IDatabase } from '../core';
import { PagedResult } from '../models';
import * as bsqlite3 from 'better-sqlite3';

import * as util from 'util';

@injectable()
export class DeviceRepository extends BaseRepository<Device> {


	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('database') protected database: IDatabase){
		super(logger, database);
	}


	public async list(): Promise<Device[]> {
		try {
			this.logger.debug(`Getting Device records from the database`);
			var result = [] as Device[];
			var rows = this.database.db.prepare('SELECT [Id], [Name], [IsActive], [ModelNumber], [RoomId], [DefaultHostName], [SerialNumber], [Notes], [SerialNumber], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM Devices').all();
			for(let i = 0; i < rows.length; i++) {
				result.push(new Device(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}

	public async listByProduct(productId: number): Promise<Device[]> {
		try {
			this.logger.debug(`Getting Device records for product ${productId} from the database`);
			var result = [] as Device[];
			var rows = this.database.db.prepare('SELECT [Id], [Name], [IsActive], [ModelNumber], [RoomId], [DefaultHostName], [SerialNumber], [Notes], [SerialNumber], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM [Devices] WHERE [ProductId] = ?').all(productId);
			for(let i = 0; i < rows.length; i++) {
				result.push(new Device(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}

	public async listByLocation(roomId: number): Promise<Device[]> {
		try {
			this.logger.debug(`Getting Device records for RoomId ${roomId} from the database`);
			var result = [] as Device[];
			var rows = this.database.db.prepare('SELECT [Id], [Name], [IsActive], [ModelNumber], [RoomId], [DefaultHostName], [SerialNumber], [Notes], [SerialNumber], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM [Devices] WHERE [RoomId] = ?').all(roomId);
			for(let i = 0; i < rows.length; i++) {
				result.push(new Device(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async listByManufacturer(manufacturerId: number): Promise<Device[]> {
		try {
			this.logger.debug(`Getting Device records for manufacturer ${manufacturerId} from the database`);
			var result = [] as Device[];
			var rows = this.database.db.prepare('SELECT [Id], [Name], [IsActive], [ModelNumber], [RoomId], [DefaultHostName], [SerialNumber], [Notes], [SerialNumber], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM [Devices] WHERE [ManufacturerId] = ?').all(manufacturerId);
			for(let i = 0; i < rows.length; i++) {
				result.push(new Device(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async get(id: number): Promise<Device> {
		try {
			this.logger.debug(`Getting Device record ${id} from the database`);
			var row = this.database.db.prepare('SELECT [Id], [Name], [IsActive], [ModelNumber], [RoomId], [DefaultHostName], [SerialNumber], [Notes], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM Devices WHERE [Id] = ?').get(id);
			var result = new Device(row);
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async save(obj: Device): Promise<Device> { 
		try {
			if (obj.Id) {
				this.logger.debug(`Updating Device record ${obj.Id} in the database`);
				this.database.db
					.prepare(`UPDATE [Devices] SET [Name] = ?, [IsActive] = ?, [ModelNumber] = ?, [RoomId] = ?, [DefaultHostName] = ?, [SerialNumber] = ?, [Notes] = ?, [ManufacturerId] = ?, [ProductId] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?`)
					.run(obj.Name, obj.IsActive ? 1 : 0, obj.ModelNumber, obj.RoomId, obj.DefaultHostName, obj.SerialNumber, obj.Notes, obj.ManufacturerId, obj.ProductId, obj.Id);

				
			} else {
				this.logger.debug(`Creating new Device record in the database`);
				this.database.db
					.prepare('INSERT INTO [Devices] ([Name], [IsActive], [ModelNumber], [RoomId], [DefaultHostName], [SerialNumber], [Notes], [ManufacturerId], [ProductId]) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
					.run(obj.Name, obj.IsActive ? 1 : 0, obj.ModelNumber, obj.RoomId, obj.DefaultHostName, obj.SerialNumber, obj.Notes, obj.ManufacturerId, obj.ProductId);
				const result = this.database.db.prepare('SELECT [Id], [IsActive], [Name], [ModelNumber], [RoomId], [DefaultHostName], [SerialNumber], [Notes], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM [Devices] ORDER BY [Id] DESC LIMIT 1').get();
				return new Device(result);
			}
			return obj;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async delete(id: number): Promise<void> {  
		try {
			this.logger.debug(`Deleting Device record ${id} from the database`);
			this.database.db.prepare('DELETE FROM [Devices] WHERE [Id] = ?').run(id);
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}



}
