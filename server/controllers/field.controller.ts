import "reflect-metadata";
import { inject, injectable } from 'inversify';
import { IDatabase, ILogger } from '../core';
import { IServerSettings } from '../config';
import { Field } from '../models';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';
import { FieldRepository } from '../repositories';

@injectable()
export class FieldController extends BaseController {

	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('serverSettings') protected settings: IServerSettings,
		@inject('database') protected database: IDatabase,
		@inject('fieldRepository') protected repository: FieldRepository){
		super(logger, settings, database);
	}


	public list = async (req: Request, res: Response) => {
		try {
			this.logger.debug('Received request for field list');
			const deviceId = parseInt(req.params.deviceId);
			const result = await this.repository.list(deviceId);
			return this.json(res, result);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

	public get = async (req: Request, res: Response) => {
		try {
			this.logger.debug('Received request for field details');
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
			this.logger.debug('Received request for field save');
			var obj = new Field(req.body);
			var result = await this.repository.save(obj);
			return this.json(res, result);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

	public delete = async (req: Request, res: Response) => {
		try {
			this.logger.debug('Received request for field delete');
			const id = parseInt(req.params.id);
			await this.repository.delete(id);
			return this.json(res, { success: true });
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}



}
