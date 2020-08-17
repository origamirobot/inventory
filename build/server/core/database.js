"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var bsqlite3 = require("better-sqlite3");
var inversify_1 = require("inversify");
var path = require("path");
var Database = /** @class */ (function () {
    function Database(serverSettings, databaseSettings, logger) {
        this.serverSettings = serverSettings;
        this.databaseSettings = databaseSettings;
        this.logger = logger;
    }
    Database.prototype.connect = function () {
        var location = path.join(__dirname, this.databaseSettings.fileLocation);
        this.logger.debug("Attaching database from " + location);
        this.db = new bsqlite3(location, { fileMustExist: this.databaseSettings.fileMustExist, verbose: console.log });
    };
    Database.prototype.disconnect = function () {
        this.db.close();
    };
    Database = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('serverSettings')),
        tslib_1.__param(1, inversify_1.inject('databaseSettings')),
        tslib_1.__param(2, inversify_1.inject('logger')),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
    ], Database);
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=database.js.map