"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRepository = void 0;
var tslib_1 = require("tslib");
var base_repository_1 = require("./base.repository");
var models_1 = require("../models");
var inversify_1 = require("inversify");
var DeviceRepository = /** @class */ (function (_super) {
    tslib_1.__extends(DeviceRepository, _super);
    function DeviceRepository(logger, database) {
        var _this = _super.call(this, logger, database) || this;
        _this.logger = logger;
        _this.database = database;
        return _this;
    }
    DeviceRepository.prototype.list = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Device records from the database");
                    result = [];
                    rows = this.database.db.prepare('SELECT [Id], [Name], [IsActive], [ModelNumber], [LocationId], [DefaultHostName], [SerialNumber], [Notes], [SerialNumber], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM Devices').all();
                    for (i = 0; i < rows.length; i++) {
                        result.push(new models_1.Device(rows[i]));
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
    DeviceRepository.prototype.listByProduct = function (productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Device records for product " + productId + " from the database");
                    result = [];
                    rows = this.database.db.prepare('SELECT [Id], [Name], [IsActive], [ModelNumber], [LocationId], [DefaultHostName], [SerialNumber], [Notes], [SerialNumber], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM [Devices] WHERE [ProductId] = ?').all(productId);
                    for (i = 0; i < rows.length; i++) {
                        result.push(new models_1.Device(rows[i]));
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
    DeviceRepository.prototype.listByLocation = function (locationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Device records for location " + locationId + " from the database");
                    result = [];
                    rows = this.database.db.prepare('SELECT [Id], [Name], [IsActive], [ModelNumber], [LocationId], [DefaultHostName], [SerialNumber], [Notes], [SerialNumber], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM [Devices] WHERE [LocationId] = ?').all(locationId);
                    for (i = 0; i < rows.length; i++) {
                        result.push(new models_1.Device(rows[i]));
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
    DeviceRepository.prototype.listByManufacturer = function (manufacturerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Device records for manufacturer " + manufacturerId + " from the database");
                    result = [];
                    rows = this.database.db.prepare('SELECT [Id], [Name], [IsActive], [ModelNumber], [LocationId], [DefaultHostName], [SerialNumber], [Notes], [SerialNumber], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM [Devices] WHERE [ManufacturerId] = ?').all(manufacturerId);
                    for (i = 0; i < rows.length; i++) {
                        result.push(new models_1.Device(rows[i]));
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
    DeviceRepository.prototype.get = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Device record " + id + " from the database");
                    row = this.database.db.prepare('SELECT [Id], [Name], [IsActive], [ModelNumber], [LocationId], [DefaultHostName], [SerialNumber], [Notes], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM Devices WHERE [Id] = ?').get(id);
                    result = new models_1.Device(row);
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
    DeviceRepository.prototype.save = function (obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    if (obj.Id) {
                        this.logger.debug("Updating Device record " + obj.Id + " in the database");
                        this.database.db
                            .prepare("UPDATE [Devices] SET [Name] = ?, [IsActive] = ?, [ModelNumber] = ?, [LocationId] = ?, [DefaultHostName] = ?, [SerialNumber] = ?, [Notes] = ?, [ManufacturerId] = ?, [ProductId] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?")
                            .run(obj.Name, obj.IsActive, obj.ModelNumber, obj.LocationId, obj.DefaultHostName, obj.SerialNumber, obj.Notes, obj.ManufacturerId, obj.ProductId, obj.Id);
                    }
                    else {
                        this.logger.debug("Creating new Device record in the database");
                        this.database.db
                            .prepare('INSERT INTO [Devices] ([Name], [IsActive], [ModelNumber], [LocationId], [DefaultHostName], [SerialNumber], [Notes], [ManufacturerId], [ProductId]) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
                            .run(obj.Name, obj.IsActive, obj.ModelNumber, obj.LocationId, obj.DefaultHostName, obj.SerialNumber, obj.Notes, obj.ManufacturerId, obj.ProductId);
                        result = this.database.db.prepare('SELECT [Id], [IsActive], [Name], [ModelNumber], [LocationId], [DefaultHostName], [SerialNumber], [Notes], [CreatedDate], [UpdatedDate], [ManufacturerId], [ProductId] FROM [Devices] ORDER BY [Id] DESC LIMIT 1').get();
                        return [2 /*return*/, new models_1.Device(result)];
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
    DeviceRepository.prototype.delete = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Deleting Device record " + id + " from the database");
                    this.database.db.prepare('DELETE FROM [Devices] WHERE [Id] = ?').run(id);
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    DeviceRepository = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('database')),
        tslib_1.__metadata("design:paramtypes", [Object, Object])
    ], DeviceRepository);
    return DeviceRepository;
}(base_repository_1.BaseRepository));
exports.DeviceRepository = DeviceRepository;
//# sourceMappingURL=device.repository.js.map