import "reflect-metadata";
import { Container } from 'inversify';
import { ServerSettings, IServerSettings, DatabaseSettings, IDatabaseSettings, IRouterSettings, RouterSettings } from '../config';
import { Logger, ILogger, IBanner, Banner, IDatabase, Database  } from '../core';
import { ConnectionController, DeviceController, FieldController, ProductController, ManufacturerController, RoomController, RouterController } from '../controllers';
import { ConnectionRepository, DeviceRepository, FieldRepository, ProductRepository, ManufacturerRepository, RoomRepository } from '../repositories';
import { IIpTableUtility, IpTableUtility, IRouterUtility, RouterUtility } from '../utilities';

export class Dependencies {

	public static async register(container: Container): Promise<any> {
		const settings = new ServerSettings();
		const logger = new Logger(settings, console.log);
		const banner = new Banner();
		const dbSettings = new DatabaseSettings();
		const database = new Database(settings, dbSettings, logger);
		const router = new RouterSettings();

		logger.debug('Registering dependencies');
		container.bind<IServerSettings>('serverSettings').toConstantValue(settings);
		container.bind<IDatabaseSettings>('databaseSettings').toConstantValue(dbSettings);
		container.bind<ILogger>('logger').toConstantValue(logger);
		container.bind<IBanner>('banner').toConstantValue(banner);
		container.bind<IDatabase>('database').toConstantValue(database);
		container.bind<IRouterSettings>('routerSettings').toConstantValue(router);
		container.bind<Container>('container').toConstantValue(container);
		

		container.bind<ConnectionController>('connectionController').to(ConnectionController);
		container.bind<DeviceController>('deviceController').to(DeviceController);
		container.bind<FieldController>('fieldController').to(FieldController);
		container.bind<ProductController>('productController').to(ProductController);
		container.bind<ManufacturerController>('manufacturerController').to(ManufacturerController);
		container.bind<RoomController>('roomController').to(RoomController);
		container.bind<RouterController>('routerController').to(RouterController);

		container.bind<ConnectionRepository>('connectionRepository').to(ConnectionRepository);
		container.bind<DeviceRepository>('deviceRepository').to(DeviceRepository);
		container.bind<FieldRepository>('fieldRepository').to(FieldRepository);
		container.bind<ProductRepository>('productRepository').to(ProductRepository);
		container.bind<ManufacturerRepository>('manufacturerRepository').to(ManufacturerRepository);
		container.bind<RoomRepository>('roomRepository').to(RoomRepository);

		container.bind<IIpTableUtility>('ipTableUtility').to(IpTableUtility);
		container.bind<IRouterUtility>('routerUtility').to(RouterUtility);

	}

}
