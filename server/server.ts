import 'reflect-metadata';
import * as express from 'express';
import * as path from 'path';
import { inject, Container } from "inversify";
import { ILogger, IBanner, IDatabase } from './core';
import { IServerSettings, IDatabaseSettings } from './config';
import { DeviceController, LightController, ConnectionController, ManufacturerController, FieldController, ProductController, RoomController, RouterController } from './controllers';


export class Server {


	public app: express.Application;
	public router: express.Router;
	protected deviceController: DeviceController;
	protected productController: ProductController;
	protected connectionController: ConnectionController;
	protected manufacturerController: ManufacturerController;
	protected fieldController: FieldController;
	protected roomController: RoomController;
	protected routerController: RouterController;
	protected lightController: LightController;

	constructor(
		@inject('logger') private logger: ILogger,
		@inject('serverSettings') private serverSettings: IServerSettings,
		@inject('databaseSettings') private databaseSettings: IDatabaseSettings,
		@inject('banner') private banner: IBanner,
		@inject('database') private database: IDatabase,
		@inject('container') private container: Container) {
		
		this.app = express();
		this.router = express.Router();
		this.config();
		this.routes();

		
		this.app.listen(serverSettings.port, (err: any) => {
			logger.debug(`Server running on port: ${serverSettings.port}`);
			banner.show();
			database.connect();
			if(err) {
				logger.error(err);
			}
		});
	}


	private config(): void {
		this.logger.debug('Configuring server middleware');
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

	}

	private routes(): void {
		this.logger.debug('Configuring server routes');

		const staticContent = path.join(__dirname, '../client');

		this.deviceController = this.container.get<DeviceController>('deviceController');
		this.router.get('/api/devices', this.deviceController.list);
		this.router.get('/api/devices/by-product/:productId', this.deviceController.listByProduct);
		this.router.get('/api/devices/by-location/:locationId', this.deviceController.listByLocation);
		this.router.get('/api/devices/by-manufacturer/:manufacturerId', this.deviceController.listByManufacturer);
		this.router.post('/api/devices', this.deviceController.save);
		this.router.put('/api/devices', this.deviceController.save);
		this.router.delete('/api/devices/:id', this.deviceController.delete);
		this.router.get('/api/devices/:id', this.deviceController.get);

		this.fieldController = this.container.get<FieldController>('fieldController');
		this.router.get('/api/fields/:deviceId', this.fieldController.list);
		this.router.post('/api/fields', this.fieldController.save);
		this.router.put('/api/fields', this.fieldController.save);
		this.router.delete('/api/fields/:id', this.fieldController.delete);

		this.connectionController = this.container.get<ConnectionController>('connectionController');
		this.router.get('/api/connections', this.connectionController.all);
		this.router.get('/api/connections/:deviceId', this.connectionController.list);
		this.router.get('/api/connection/:id', this.connectionController.get);
		this.router.post('/api/connections', this.connectionController.save);
		this.router.put('/api/connections', this.connectionController.save);
		this.router.delete('/api/connections/:id', this.connectionController.delete);
		this.router.get('/api/connection-types', this.connectionController.types);


		this.productController = this.container.get<ProductController>('productController');
		this.router.get('/api/products', this.productController.all);
		this.router.get('/api/product/:id', this.productController.get);
		this.router.get('/api/products/:manufacturerId', this.productController.list);
		this.router.post('/api/products', this.productController.save);
		this.router.put('/api/products', this.productController.save);
		this.router.delete('/api/products/:id', this.productController.delete);

		this.manufacturerController = this.container.get<ManufacturerController>('manufacturerController');
		this.router.get('/api/manufacturers', this.manufacturerController.list);
		this.router.post('/api/manufacturers', this.manufacturerController.save);
		this.router.put('/api/manufacturers', this.manufacturerController.save);
		this.router.delete('/api/manufacturers/:id', this.manufacturerController.delete);
		this.router.get('/api/manufacturers/:id', this.manufacturerController.get);



		this.roomController = this.container.get<RoomController>('roomController');
		this.router.get('/api/rooms', this.roomController.all);
		this.router.get('/api/rooms/:id', this.roomController.get);
		this.router.post('/api/rooms', this.roomController.save);
		this.router.put('/api/rooms', this.roomController.save);
		this.router.delete('/api/rooms/:id', this.roomController.delete);
		this.router.get('/api/rooms/:id', this.roomController.get);

		this.lightController = this.container.get<LightController>('lightController');
		this.router.get('/api/lights', this.lightController.all);
		this.router.post('/api/lights', this.lightController.save);
		this.router.put('/api/lights', this.lightController.save);
		this.router.delete('/api/lights/:id', this.lightController.delete);
		this.router.get('/api/lights/:id', this.lightController.get);

		this.routerController = this.container.get<RouterController>('routerController');
		this.router.get('/api/router/iptables', this.routerController.iptables);
		this.router.get('/api/router/settings', this.routerController.listSettings);



		this.router.use(express.static(staticContent));

		this.router.all('/*', function(req, res, next) {
			res.sendFile(path.join(__dirname, '../client/index.html'));
		});

		//this.router.get('/', (req, res) => res.send({hello: 'world'}));
		this.app.use(this.router);

	}


}
