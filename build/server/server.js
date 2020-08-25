"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var express = require("express");
var path = require("path");
var inversify_1 = require("inversify");
var Server = /** @class */ (function () {
    function Server(logger, serverSettings, databaseSettings, banner, database, container) {
        this.logger = logger;
        this.serverSettings = serverSettings;
        this.databaseSettings = databaseSettings;
        this.banner = banner;
        this.database = database;
        this.container = container;
        this.app = express();
        this.router = express.Router();
        this.config();
        this.routes();
        this.app.listen(serverSettings.port, function (err) {
            logger.debug("Server running on port: " + serverSettings.port);
            banner.show();
            database.connect();
            if (err) {
                logger.error(err);
            }
        });
    }
    Server.prototype.config = function () {
        this.logger.debug('Configuring server middleware');
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    };
    Server.prototype.routes = function () {
        this.logger.debug('Configuring server routes');
        var staticContent = path.join(__dirname, '../client');
        this.deviceController = this.container.get('deviceController');
        this.router.get('/api/devices', this.deviceController.list);
        this.router.get('/api/devices/by-product/:productId', this.deviceController.listByProduct);
        this.router.get('/api/devices/by-location/:locationId', this.deviceController.listByLocation);
        this.router.get('/api/devices/by-manufacturer/:manufacturerId', this.deviceController.listByManufacturer);
        this.router.post('/api/devices', this.deviceController.save);
        this.router.put('/api/devices', this.deviceController.save);
        this.router.delete('/api/devices/:id', this.deviceController.delete);
        this.router.get('/api/devices/:id', this.deviceController.get);
        this.fieldController = this.container.get('fieldController');
        this.router.get('/api/fields/:deviceId', this.fieldController.list);
        this.router.post('/api/fields', this.fieldController.save);
        this.router.put('/api/fields', this.fieldController.save);
        this.router.delete('/api/fields/:id', this.fieldController.delete);
        this.connectionController = this.container.get('connectionController');
        this.router.get('/api/connections', this.connectionController.all);
        this.router.get('/api/connections/:deviceId', this.connectionController.list);
        this.router.get('/api/connection/:id', this.connectionController.get);
        this.router.post('/api/connections', this.connectionController.save);
        this.router.put('/api/connections', this.connectionController.save);
        this.router.delete('/api/connections/:id', this.connectionController.delete);
        this.router.get('/api/connection-types', this.connectionController.types);
        this.productController = this.container.get('productController');
        this.router.get('/api/products', this.productController.all);
        this.router.get('/api/product/:id', this.productController.get);
        this.router.get('/api/products/:manufacturerId', this.productController.list);
        this.router.post('/api/products', this.productController.save);
        this.router.put('/api/products', this.productController.save);
        this.router.delete('/api/products/:id', this.productController.delete);
        this.manufacturerController = this.container.get('manufacturerController');
        this.router.get('/api/manufacturers', this.manufacturerController.list);
        this.router.post('/api/manufacturers', this.manufacturerController.save);
        this.router.put('/api/manufacturers', this.manufacturerController.save);
        this.router.delete('/api/manufacturers/:id', this.manufacturerController.delete);
        this.router.get('/api/manufacturers/:id', this.manufacturerController.get);
        this.roomController = this.container.get('roomController');
        this.router.get('/api/rooms', this.roomController.all);
        this.router.get('/api/rooms/:id', this.roomController.get);
        this.router.post('/api/rooms', this.roomController.save);
        this.router.put('/api/rooms', this.roomController.save);
        this.router.delete('/api/rooms/:id', this.roomController.delete);
        this.router.get('/api/rooms/:id', this.roomController.get);
        this.lightController = this.container.get('lightController');
        this.router.get('/api/lights', this.lightController.all);
        this.router.get('/api/lights/discover', this.lightController.discover);
        this.router.post('/api/lights', this.lightController.save);
        this.router.put('/api/lights', this.lightController.save);
        this.router.delete('/api/lights/:id', this.lightController.delete);
        this.router.get('/api/lights/:id', this.lightController.get);
        this.routerController = this.container.get('routerController');
        this.router.get('/api/router/iptables', this.routerController.iptables);
        this.router.get('/api/router/settings', this.routerController.listSettings);
        this.router.use(express.static(staticContent));
        this.router.all('/*', function (req, res, next) {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });
        //this.router.get('/', (req, res) => res.send({hello: 'world'}));
        this.app.use(this.router);
    };
    Server = tslib_1.__decorate([
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('serverSettings')),
        tslib_1.__param(2, inversify_1.inject('databaseSettings')),
        tslib_1.__param(3, inversify_1.inject('banner')),
        tslib_1.__param(4, inversify_1.inject('database')),
        tslib_1.__param(5, inversify_1.inject('container')),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object, inversify_1.Container])
    ], Server);
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map