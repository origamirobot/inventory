"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightRepository = void 0;
var tslib_1 = require("tslib");
var base_repository_1 = require("./base.repository");
var models_1 = require("../models");
var inversify_1 = require("inversify");
var LightRepository = /** @class */ (function (_super) {
    tslib_1.__extends(LightRepository, _super);
    function LightRepository(logger, database) {
        var _this = _super.call(this, logger, database) || this;
        _this.logger = logger;
        _this.database = database;
        return _this;
    }
    LightRepository.prototype.list = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Light records from the database");
                    result = [];
                    rows = this.database.db.prepare('SELECT [Id], [ProductId], [Name], [ModelNumber], [ModelName], [ManufacturerId], [RoomId], [SW], [CreatedDate], [UpdatedDate] FROM [Lights]').all();
                    for (i = 0; i < rows.length; i++) {
                        result.push(new models_1.Light(rows[i]));
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
    LightRepository.prototype.get = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Light record " + id + " from the database");
                    row = this.database.db.prepare('SELECT [Id], [ProductId], [Name], [ModelNumber], [ModelName], [ManufacturerId], [RoomId], [SW], [CreatedDate], [UpdatedDate] FROM [Lights] WHERE [Id] = ?').get(id);
                    result = new models_1.Light(row);
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
    LightRepository.prototype.save = function (obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    if (obj.Id) {
                        this.logger.debug("Updating Light record " + obj.Id + " in the database");
                        this.database.db
                            .prepare("UPDATE [Lights] SET [Name] = ?, [ProductId] = ? [ModelNumber] = ?, [ModelName] = ?, [RoomId] = ?, [SW] = ?, [ManufacturerId] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?")
                            .run(obj.Name, obj.ProductId, obj.ModelNumber, obj.ModelName, obj.RoomId, obj.SW, obj.ManufacturerId, obj.Id);
                    }
                    else {
                        this.logger.debug("Creating new Room record in the database");
                        this.database.db
                            .prepare('INSERT INTO [Lights] ([Name], [ProductId], [ModelNumber], [ModelName], [RoomId], [SW], [ManufacturerId]) VALUES (?, ?, ?, ?, ?, ?, ?)')
                            .run(obj.Name, obj.ProductId, obj.ModelNumber, obj.ModelName, obj.RoomId, obj.SW, obj.ManufacturerId);
                        result = this.database.db.prepare('SELECT [Id], [ProductId], [Name], [ModelNumber], [ModelName], [ManufacturerId], [RoomId], [SW], [CreatedDate], [UpdatedDate] FROM [Lights] ORDER BY [Id] DESC LIMIT 1').get();
                        return [2 /*return*/, new models_1.Light(result)];
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
    LightRepository.prototype.delete = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Deleting Light record " + id + " from the database");
                    this.database.db.prepare('DELETE FROM [Lights] WHERE [Id] = ?').run(id);
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    LightRepository = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('database')),
        tslib_1.__metadata("design:paramtypes", [Object, Object])
    ], LightRepository);
    return LightRepository;
}(base_repository_1.BaseRepository));
exports.LightRepository = LightRepository;
//# sourceMappingURL=light.repository.js.map