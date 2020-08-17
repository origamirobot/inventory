import { inject, injectable } from 'inversify';
import { ILogger, IDatabase } from '../core';
import { PagedResult } from '../models';

@injectable()
export abstract class BaseRepository<T> {

	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('database') protected database: IDatabase){ }

	public abstract list(): Promise<T[]>;
	public abstract get(id: number): Promise<T>;
	public abstract save(obj: T): Promise<T>;
	public abstract delete(id: number): Promise<void>;

}
