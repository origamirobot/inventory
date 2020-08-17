import "reflect-metadata";
import { inject, injectable } from 'inversify';
import { IDatabase, ILogger } from '../core';
import { IServerSettings } from '../config';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';
import { LocationRepository } from '../repositories';
import { Location } from '../models';

@injectable()
export class LocationController extends BaseController {

	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('serverSettings') protected settings: IServerSettings,
		@inject('database') protected database: IDatabase,
		@inject('locationRepository') protected repository: LocationRepository){
		super(logger, settings, database);
	}


	public all = async (req: Request, res: Response) => {
		try {
			this.logger.debug('Received request for location list');
			const result = await this.repository.list();
			return this.json(res, result);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}


	public get = async (req: Request, res: Response) => {
		try {
			this.logger.debug('Received request for location details');
			const id = parseInt(req.params.id);
			var result = await this.repository.get(id);
			return this.json(res, result);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

	public save = async (req: Request, res: Response) => {
		try {
			this.logger.debug('Received request for location save');
			var obj = new Location(req.body);
			var result = await this.repository.save(obj);
			return this.json(res, result);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

	public delete = async (req: Request, res: Response) => {
		try {
			this.logger.debug('Received request for location delete');
			const id = parseInt(req.params.id);
			await this.repository.delete(id);
			return this.json(res, { success: true });
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}



}
