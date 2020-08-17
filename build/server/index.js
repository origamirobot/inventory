"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var config_1 = require("./config");
var server_1 = require("./server");
var container = new inversify_1.Container();
config_1.Dependencies.register(container).then(function () {
    var logger = container.get('logger');
    var settings = container.get('serverSettings');
    var dbSettings = container.get('databaseSettings');
    var banner = container.get('banner');
    var database = container.get('database');
    var server = new server_1.Server(logger, settings, dbSettings, banner, database, container);
});
//# sourceMappingURL=index.js.map