import "reflect-metadata";
import { Container } from "inversify";
import { Dependencies, IDatabaseSettings, IServerSettings } from './config';
import { IDatabase, IBanner, ILogger } from './core';
import { Server } from './server';

const container = new Container();

Dependencies.register(container).then(() => {
	
	const logger = container.get<ILogger>('logger');
	const settings = container.get<IServerSettings>('serverSettings');
	const dbSettings = container.get<IDatabaseSettings>('databaseSettings');
	const banner = container.get<IBanner>('banner');
	const database = container.get<IDatabase>('database');
	
	
	const server = new Server(logger, settings, dbSettings, banner, database, container);

});



