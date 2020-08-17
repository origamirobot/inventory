"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRepository = void 0;
var tslib_1 = require("tslib");
var base_repository_1 = require("./base.repository");
var models_1 = require("../models");
var inversify_1 = require("inversify");
var LocationRepository = /** @class */ (function (_super) {
    tslib_1.__extends(LocationRepository, _super);
    function LocationRepository(logger, database) {
        var _this = _super.call(this, logger, database) || this;
        _this.logger = logger;
        _this.database = database;
        return _this;
    }
    LocationRepository.prototype.list = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Location records from the database");
                    result = [];
                    rows = this.database.db.prepare('SELECT [Id], [Name], [Description], [CreatedDate], [UpdatedDate] FROM [Locations]').all();
                    for (i = 0; i < rows.length; i++) {
                        result.push(new models_1.Location(rows[i]));
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
    LocationRepository.prototype.get = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Location record " + id + " from the database");
                    row = this.database.db.prepare('SELECT [Id], [Name], [Description], [CreatedDate], [UpdatedDate] FROM [Locations] WHERE [Id] = ?').get(id);
                    result = new models_1.Location(row);
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
    LocationRepository.prototype.save = function (obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    if (obj.Id) {
                        this.logger.debug("Updating Location record " + obj.Id + " in the database");
                        this.database.db
                            .prepare("UPDATE [Locations] SET [Name] = ?, [Description] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?")
                            .run(obj.Name, obj.Description, obj.Id);
                    }
                    else {
                        this.logger.debug("Creating new Location record in the database");
                        this.database.db
                            .prepare('INSERT INTO [Locations] ([Name], [Description]) VALUES (?, ?)')
                            .run(obj.Name, obj.Description);
                        result = this.database.db.prepare('SELECT [Id], [Description], [Name], [CreatedDate], [UpdatedDate] FROM [Locations] ORDER BY [Id] DESC LIMIT 1').get();
                        return [2 /*return*/, new models_1.Location(result)];
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
    LocationRepository.prototype.delete = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Deleting Location record " + id + " from the database");
                    this.database.db.prepare('DELETE FROM [Locations] WHERE [Id] = ?').run(id);
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    LocationRepository = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('database')),
        tslib_1.__metadata("design:paramtypes", [Object, Object])
    ], LocationRepository);
    return LocationRepository;
}(base_repository_1.BaseRepository));
exports.LocationRepository = LocationRepository;
//# sourceMappingURL=location.repository.js.map