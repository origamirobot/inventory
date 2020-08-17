"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionRepository = void 0;
var tslib_1 = require("tslib");
var base_repository_1 = require("./base.repository");
var models_1 = require("../models");
var inversify_1 = require("inversify");
var connectionType_model_1 = require("../models/connectionType.model");
var ConnectionRepository = /** @class */ (function (_super) {
    tslib_1.__extends(ConnectionRepository, _super);
    function ConnectionRepository(logger, database) {
        var _this = _super.call(this, logger, database) || this;
        _this.logger = logger;
        _this.database = database;
        return _this;
    }
    ConnectionRepository.prototype.list = function (deviceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Connection records from the database");
                    result = [];
                    rows = [];
                    if (deviceId != null) {
                        rows = this.database.db.prepare('SELECT [Id], [Name], [ConnectionTypeId], [HostName], [DeviceId], [CreatedDate], [UpdatedDate], [MacAddress], [IpAddress] FROM [Connections] WHERE [DeviceId] = ?').all(deviceId);
                    }
                    else {
                        rows = this.database.db.prepare('SELECT [Id], [Name], [ConnectionTypeId], [HostName], [DeviceId], [CreatedDate], [UpdatedDate], [MacAddress], [IpAddress] FROM [Connections]').all();
                    }
                    for (i = 0; i < rows.length; i++) {
                        result.push(new models_1.Connection(rows[i]));
                    }
                    return [2 /*return*/, result];
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    ConnectionRepository.prototype.types = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Connection Type records from the database");
                    result = [];
                    rows = this.database.db.prepare('SELECT [Id], [Name] FROM [ConnectionTypes]').all();
                    for (i = 0; i < rows.length; i++) {
                        result.push(new connectionType_model_1.ConnectionType(rows[i]));
                    }
                    return [2 /*return*/, result];
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    ConnectionRepository.prototype.get = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Connection record " + id + " from the database");
                    row = this.database.db.prepare('SELECT [Id], [Name], [ConnectionTypeId], [HostName], [DeviceId], [CreatedDate], [UpdatedDate], [MacAddress], [IpAddress] FROM [Connections] WHERE [Id] = ?').get(id);
                    result = new models_1.Connection(row);
                    return [2 /*return*/, result];
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    ConnectionRepository.prototype.save = function (obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    if (obj.Id) {
                        this.logger.debug("Updating Connection record " + obj.Id + " in the database");
                        this.database.db
                            .prepare("UPDATE [Connections] SET [Name] = ?, [ConnectionTypeId] = ?, [HostName] = ?, [MacAddress] = ?, [IpAddress] = ?, [DeviceId] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?")
                            .run(obj.Name, obj.ConnectionTypeId, obj.HostName, obj.MacAddress, obj.IpAddress, obj.DeviceId, obj.Id);
                    }
                    else {
                        this.logger.debug("Creating new Connection record in the database");
                        this.database.db
                            .prepare('INSERT INTO [Connections] ([Name], [ConnectionTypeId], [HostName], [MacAddress], [IpAddress], [DeviceId]) VALUES (?, ?, ?, ?, ?, ?)')
                            .run(obj.Name, obj.ConnectionTypeId, obj.HostName, obj.MacAddress, obj.IpAddress, obj.DeviceId);
                        result = this.database.db.prepare('SELECT [Id], [ConnectionTypeId], [Name], [HostName], [DeviceId], [CreatedDate], [UpdatedDate], [MacAddress], [IpAddress] FROM [Connections] ORDER BY [Id] DESC LIMIT 1').get();
                        return [2 /*return*/, new models_1.Connection(result)];
                    }
                    return [2 /*return*/, obj];
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    ConnectionRepository.prototype.delete = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Deleting Connection record " + id + " from the database");
                    this.database.db.prepare('DELETE FROM [Connections] WHERE [Id] = ?').run(id);
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    ConnectionRepository = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('database')),
        tslib_1.__metadata("design:paramtypes", [Object, Object])
    ], ConnectionRepository);
    return ConnectionRepository;
}(base_repository_1.BaseRepository));
exports.ConnectionRepository = ConnectionRepository;
//# sourceMappingURL=connection.repository.js.map