"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturerRepository = void 0;
var tslib_1 = require("tslib");
var base_repository_1 = require("./base.repository");
var models_1 = require("../models");
var inversify_1 = require("inversify");
var ManufacturerRepository = /** @class */ (function (_super) {
    tslib_1.__extends(ManufacturerRepository, _super);
    function ManufacturerRepository(logger, database) {
        var _this = _super.call(this, logger, database) || this;
        _this.logger = logger;
        _this.database = database;
        return _this;
    }
    ManufacturerRepository.prototype.list = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Manufacturer records from the database");
                    result = [];
                    rows = this.database.db.prepare('SELECT [Id], [Name], [Url], [CreatedDate], [UpdatedDate] FROM [Manufacturers] ORDER BY [Name]').all();
                    for (i = 0; i < rows.length; i++) {
                        result.push(new models_1.Manufacturer(rows[i]));
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
    ManufacturerRepository.prototype.get = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Manufacturer record " + id + " from the database");
                    row = this.database.db.prepare('SELECT [Id], [Name], [Url], [CreatedDate], [UpdatedDate] FROM [Manufacturers] WHERE [Id] = ?').get(id);
                    result = new models_1.Manufacturer(row);
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
    ManufacturerRepository.prototype.save = function (obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    if (obj.Id) {
                        this.logger.debug("Updating Manufacturer record " + obj.Id + " in the database");
                        this.database.db
                            .prepare("UPDATE [Manufacturers] SET [Name] = ?, [Url] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?")
                            .run(obj.Name, obj.Url, obj.Id);
                    }
                    else {
                        this.logger.debug("Creating new Manufacturer record in the database");
                        this.database.db
                            .prepare('INSERT INTO [Manufacturers] ([Name], [Url]) VALUES (?, ?)')
                            .run(obj.Name, obj.Url);
                        result = this.database.db.prepare('SELECT [Id], [Name], [Url], [CreatedDate], [UpdatedDate] FROM [Manufacturers] ORDER BY [Id] DESC LIMIT 1').get();
                        return [2 /*return*/, new models_1.Manufacturer(result)];
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
    ManufacturerRepository.prototype.delete = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Deleting Manufacturer record " + id + " from the database");
                    this.database.db.prepare('DELETE FROM [Manufacturers] WHERE [Id] = ?').run(id);
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    ManufacturerRepository = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('database')),
        tslib_1.__metadata("design:paramtypes", [Object, Object])
    ], ManufacturerRepository);
    return ManufacturerRepository;
}(base_repository_1.BaseRepository));
exports.ManufacturerRepository = ManufacturerRepository;
//# sourceMappingURL=manufacturer.repository.js.map