import "reflect-metadata";
import { inject, injectable } from 'inversify';
import { IDatabase, ILogger } from '../core';
import { IServerSettings } from '../config';
import { Request, Response } from 'express';

@injectable()
export abstract class BaseController {


	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('serverSettings') protected settings: IServerSettings,
		@inject('database') protected database: IDatabase){

	}

	/** Sends JSON back to the client with a 200 status. */
	protected json(res: Response, obj: any): void {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.status(200).json(obj);
	}

	/** Sends JSON back to the client with the specified status. */
	protected jsonError(res: Response, status: number, obj: any): void {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.status(status).json(obj);
	}


}
