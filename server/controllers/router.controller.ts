import "reflect-metadata";
import { inject, injectable } from 'inversify';
import { IDatabase, ILogger } from '../core';
import { IServerSettings } from '../config';
import { BaseController } from './base.controller';
import { Request, Response } from 'express';
import { DeviceRepository } from '../repositories';
import { IIpTableUtility, IRouterUtility } from '../utilities';
import { prototype } from 'module';


@injectable()
export class RouterController extends BaseController {

	constructor(
		@inject('logger') protected logger: ILogger,
		@inject('serverSettings') protected settings: IServerSettings,
		@inject('database') protected database: IDatabase,
		@inject('deviceRepository') protected repository: DeviceRepository,
		@inject('ipTableUtility') protected ipTableUtility: IIpTableUtility,
		@inject('routerUtility') protected routerUtility: IRouterUtility){
		super(logger, settings, database);
	}

	

	public iptables = async(req: Request, res: Response) => {
		try {
			var table = await this.ipTableUtility.getFilterTable();
			return this.json(res, table);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}

	public listSettings = async(req: Request, res: Response) => {
		try {
			var table = await this.routerUtility.listSettings();
			return this.json(res, table);
		} catch(err) {
			this.logger.error(err);
			return this.jsonError(res, 500, { error: err });
		}
	}


}
