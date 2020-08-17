"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRepository = void 0;
var tslib_1 = require("tslib");
var base_repository_1 = require("./base.repository");
var models_1 = require("../models");
var inversify_1 = require("inversify");
var FieldRepository = /** @class */ (function (_super) {
    tslib_1.__extends(FieldRepository, _super);
    function FieldRepository(logger, database) {
        var _this = _super.call(this, logger, database) || this;
        _this.logger = logger;
        _this.database = database;
        return _this;
    }
    FieldRepository.prototype.list = function (deviceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rows, i;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Field records from the database");
                    result = [];
                    rows = this.database.db.prepare('SELECT [Id], [Name], [Value], [DeviceId], [CreatedDate], [UpdatedDate], [Description] FROM [Fields] WHERE [DeviceId] = ?').all(deviceId);
                    for (i = 0; i < rows.length; i++) {
                        result.push(new models_1.Field(rows[i]));
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
    FieldRepository.prototype.get = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Getting Field record " + id + " from the database");
                    row = this.database.db.prepare('SELECT [Id], [Name], [Value], [DeviceId], [CreatedDate], [UpdatedDate], [Description] FROM [Fields] WHERE [Id] = ?').get(id);
                    result = new models_1.Field(row);
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
    FieldRepository.prototype.save = function (obj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                try {
                    if (obj.Id) {
                        this.logger.debug("Updating Field record " + obj.Id + " in the database");
                        this.database.db
                            .prepare("UPDATE [Fields] SET [Name] = ?, [Description] = ?, [Value] = ?, [DeviceId] = ?, [UpdatedDate] = datetime('now', 'localtime') WHERE [Id] = ?")
                            .run(obj.Name, obj.Description, obj.Value, obj.DeviceId, obj.Id);
                    }
                    else {
                        this.logger.debug("Creating new Connection record in the database");
                        this.database.db
                            .prepare('INSERT INTO [Fields] ([Name], [Value], [Description], [DeviceId]) VALUES (?, ?, ?, ?)')
                            .run(obj.Name, obj.Value, obj.Description, obj.DeviceId);
                        result = this.database.db.prepare('SELECT [Id], [Name], [Value], [DeviceId], [CreatedDate], [UpdatedDate], [Description] FROM [Fields] ORDER BY [Id] DESC LIMIT 1').get();
                        return [2 /*return*/, new models_1.Field(result)];
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
    FieldRepository.prototype.delete = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.logger.debug("Deleting Field record " + id + " from the database");
                    this.database.db.prepare('DELETE FROM [Fields] WHERE [Id] = ?').run(id);
                }
                catch (err) {
                    this.logger.error(err);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    FieldRepository = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('database')),
        tslib_1.__metadata("design:paramtypes", [Object, Object])
    ], FieldRepository);
    return FieldRepository;
}(base_repository_1.BaseRepository));
exports.FieldRepository = FieldRepository;
//# sourceMappingURL=field.repository.js.map