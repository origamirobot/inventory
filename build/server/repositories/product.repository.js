"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
var tslib_1 = require("tslib");
var base_repository_1 = require("./base.repository");
var models_1 = require("../models");
var inversify_1 = require("inversify");
var ProductRepository = /** @class */ (function (_super) {
    tslib_1.__extends(ProductRepository, _super);
    function ProductRepository(logger, database) {
        var _this = _super.call(this, logger, database) || this;
        _this.logger = logger;
        _this.database = database;
        return _this;
    }
    ProductRepository.prototype.list = function (manufacturerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Product records from the database");
                    result = [];
                    rows = [];
                    if (manufacturerId == null) {
                        rows = this.database.db.prepare('SELECT [Id], [Name], [Url], [ManufacturerId], [CreatedDate], [UpdatedDate] FROM [Products] ORDER BY [Name]').all();
                    }
                    else {
                        rows = this.database.db.prepare('SELECT [Id], [Name], [Url], [ManufacturerId], [CreatedDate], [UpdatedDate] FROM [Products] WHERE [ManufacturerId] = ? ORDER BY [Name]').all(manufacturerId);
                    }
                    for (i = 0; i < rows.length; i++) {
                        result.push(new models_1.Product(rows[i]));
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
    ProductRepository.prototype.get = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Product record " + id + " from the database");
                    row = this.database.db.prepare('SELECT [Id], [Name], [Url], [ManufacturerId], [CreatedDate], [UpdatedDate] FROM [Products] WHERE [Id] = ?').get(id);
                    result = new models_1.Product(row);
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
    ProductRepository.prototype.save = function (obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    if (obj.Id) {
                        this.logger.debug("Updating Product record " + obj.Id + " in the database");
                        this.database.db
                            .prepare("UPDATE [Products] SET [Name] = ?, [ManufacturerId] = ?, [Url] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?")
                            .run(obj.Name, obj.ManufacturerId, obj.Url, obj.Id);
                    }
                    else {
                        this.logger.debug("Creating new Product record in the database");
                        this.database.db
                            .prepare('INSERT INTO [Products] ([Name], [Url], [ManufacturerId]) VALUES (?, ?, ?)')
                            .run(obj.Name, obj.Url, obj.ManufacturerId);
                        result = this.database.db.prepare('SELECT [Id], [Name], [Url], [ManufacturerId], [CreatedDate], [UpdatedDate] FROM [Products] ORDER BY [Id] DESC LIMIT 1').get();
                        return [2 /*return*/, new models_1.Product(result)];
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
    ProductRepository.prototype.delete = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Deleting Product record " + id + " from the database");
                    this.database.db.prepare('DELETE FROM [Products] WHERE [Id] = ?').run(id);
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    ProductRepository = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('database')),
        tslib_1.__metadata("design:paramtypes", [Object, Object])
    ], ProductRepository);
    return ProductRepository;
}(base_repository_1.BaseRepository));
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map