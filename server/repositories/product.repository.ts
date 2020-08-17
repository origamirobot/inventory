import { BaseRepository } from './base.repository';
import { Product, PagedResult } from '../models';
import { inject, injectable } from 'inversify';
import { ILogger, IDatabase } from '../core';
import * as util from 'util';

@injectable()
export class ProductRepository extends BaseRepository<Product> {


	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('database') protected database: IDatabase){
		super(logger, database);
	}


	public async list(manufacturerId?: number): Promise<Product[]> {
		try {
			this.logger.debug(`Getting Product records from the database`);
			var result = [] as Product[];
			var rows = [];
			if(manufacturerId == null) {
				rows = this.database.db.prepare('SELECT [Id], [Name], [Url], [ManufacturerId], [CreatedDate], [UpdatedDate] FROM [Products] ORDER BY [Name]').all();
			} else {
				rows = this.database.db.prepare('SELECT [Id], [Name], [Url], [ManufacturerId], [CreatedDate], [UpdatedDate] FROM [Products] WHERE [ManufacturerId] = ? ORDER BY [Name]').all(manufacturerId);
			}
			for(let i = 0; i < rows.length; i++) {
				result.push(new Product(rows[i]));
			}
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async get(id: number): Promise<Product> {
		try {
			this.logger.debug(`Getting Product record ${id} from the database`);
			var row = this.database.db.prepare('SELECT [Id], [Name], [Url], [ManufacturerId], [CreatedDate], [UpdatedDate] FROM [Products] WHERE [Id] = ?').get(id);
			var result = new Product(row);
			return result;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async save(obj: Product): Promise<Product> { 
		try {
			if (obj.Id) {
				this.logger.debug(`Updating Product record ${obj.Id} in the database`);
				this.database.db
					.prepare(`UPDATE [Products] SET [Name] = ?, [ManufacturerId] = ?, [Url] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?`)
					.run(obj.Name, obj.ManufacturerId, obj.Url, obj.Id);

				
			} else {
				this.logger.debug(`Creating new Product record in the database`);
				this.database.db
					.prepare('INSERT INTO [Products] ([Name], [Url], [ManufacturerId]) VALUES (?, ?, ?)')
					.run(obj.Name, obj.Url, obj.ManufacturerId);
				const result = this.database.db.prepare('SELECT [Id], [Name], [Url], [ManufacturerId], [CreatedDate], [UpdatedDate] FROM [Products] ORDER BY [Id] DESC LIMIT 1').get();
				return new Product(result);
			}
			return obj;
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}
	
	public async delete(id: number): Promise<void> {  
		try {
			this.logger.debug(`Deleting Product record ${id} from the database`);
			this.database.db.prepare('DELETE FROM [Products] WHERE [Id] = ?').run(id);
		} catch (err) {
			this.logger.error(err);
			throw err;
		}
	}



}
