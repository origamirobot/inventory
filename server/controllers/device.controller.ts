import "reflect-metadata";
import { inject, injectable } from 'inversify';
import { IDatabase, ILogger } from '../core';
import { IServerSettings } from '../config';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';
import { DeviceRepository } from '../repositories';
import { Device } from '../models';

@injectable()
export class DeviceController extends BaseController {

	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('serverSettings') protected settings: IServerSettings,
		@inject('database') protected database: IDatabase,
		@inject('deviceRepository') protected repository: DeviceRepository){
		super(logger, settings, database);
	}

	public list = async (req: Request, res: Response) => {
		try {
			this.logger.debug('Received request for device list');
			const result = await this.repository.list();
			return this.json(res, result);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

	public listByProduct = async (req: Request, res: Response) => {
		try {
			const productId = parseInt(req.params.productId);
			this.logger.debug(`Received request for device list for product ${productId}`);
			const result = await this.repository.listByProduct(productId);
			return this.json(res, result);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

	public listByLocation = async (req: Request, res: Response) => {
		try {
			const locationId = parseInt(req.params.locationId);
			this.logger.debug(`Received request for device list for location ${locationId}`);
			const result = await this.repository.listByLocation(locationId);
			return this.json(res, result);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

	public listByManufacturer = async (req: Request, res: Response) => {
		try {
			const manufacturerId = parseInt(req.params.manufacturerId);
			this.logger.debug(`Received request for device list for manufacturer ${manufacturerId}`);
			const result = await this.repository.listByManufacturer(manufacturerId);
			return this.json(res, result);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

	public get = async (req: Request, res: Response) => {
		try {
			this.logger.debug('Received request for device details');
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
			this.logger.debug('Received request for device save');
			var obj = new Device(req.body);
			var result = await this.repository.save(obj);
			return this.json(res, result);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

	public delete = async (req: Request, res: Response) => {
		try {
			this.logger.debug('Received request for device delete');
			const id = parseInt(req.params.id);
			await this.repository.delete(id);
			return this.json(res, { success: true });
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

}
