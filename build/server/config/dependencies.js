"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependencies = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var config_1 = require("../config");
var core_1 = require("../core");
var controllers_1 = require("../controllers");
var repositories_1 = require("../repositories");
var utilities_1 = require("../utilities");
var Dependencies = /** @class */ (function () {
    function Dependencies() {
    }
    Dependencies.register = function (container) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var settings, logger, banner, dbSettings, database, router;
            return tslib_1.__generator(this, function (_a) {
                settings = new config_1.ServerSettings();
                logger = new core_1.Logger(settings, console.log);
                banner = new core_1.Banner();
                dbSettings = new config_1.DatabaseSettings();
                database = new core_1.Database(settings, dbSettings, logger);
                router = new config_1.RouterSettings();
                logger.debug('Registering dependencies');
                container.bind('serverSettings').toConstantValue(settings);
                container.bind('databaseSettings').toConstantValue(dbSettings);
                container.bind('logger').toConstantValue(logger);
                container.bind('banner').toConstantValue(banner);
                container.bind('database').toConstantValue(database);
                container.bind('routerSettings').toConstantValue(router);
                container.bind('container').toConstantValue(container);
                container.bind('connectionController').to(controllers_1.ConnectionController);
                container.bind('deviceController').to(controllers_1.DeviceController);
                container.bind('fieldController').to(controllers_1.FieldController);
                container.bind('productController').to(controllers_1.ProductController);
                container.bind('manufacturerController').to(controllers_1.ManufacturerController);
                container.bind('roomController').to(controllers_1.RoomController);
                container.bind('routerController').to(controllers_1.RouterController);
                container.bind('connectionRepository').to(repositories_1.ConnectionRepository);
                container.bind('deviceRepository').to(repositories_1.DeviceRepository);
                container.bind('fieldRepository').to(repositories_1.FieldRepository);
                container.bind('productRepository').to(repositories_1.ProductRepository);
                container.bind('manufacturerRepository').to(repositories_1.ManufacturerRepository);
                container.bind('roomRepository').to(repositories_1.RoomRepository);
                container.bind('ipTableUtility').to(utilities_1.IpTableUtility);
                container.bind('routerUtility').to(utilities_1.RouterUtility);
                return [2 /*return*/];
            });
        });
    };
    return Dependencies;
}());
exports.Dependencies = Dependencies;
//# sourceMappingURL=dependencies.js.map