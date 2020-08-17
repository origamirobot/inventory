"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionController = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var inversify_1 = require("inversify");
var base_controller_1 = require("./base.controller");
var repositories_1 = require("../repositories");
var models_1 = require("../models");
var ConnectionController = /** @class */ (function (_super) {
    tslib_1.__extends(ConnectionController, _super);
    function ConnectionController(logger, settings, database, repository) {
        var _this = _super.call(this, logger, settings, database) || this;
        _this.logger = logger;
        _this.settings = settings;
        _this.database = database;
        _this.repository = repository;
        _this.all = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.debug('Received request for connection list');
                        return [4 /*yield*/, this.repository.list()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.json(res, result)];
                    case 2:
                        err_1 = _a.sent();
                        this.logger.error(err_1);
                        return [2 /*return*/, this.jsonError(res, 500, { error: err_1 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.types = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.debug('Received request for connection types list');
                        return [4 /*yield*/, this.repository.types()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.json(res, result)];
                    case 2:
                        err_2 = _a.sent();
                        this.logger.error(err_2);
                        return [2 /*return*/, this.jsonError(res, 500, { error: err_2 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.list = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var deviceId, result, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        deviceId = parseInt(req.params.deviceId);
                        this.logger.debug('Received request for connection list');
                        return [4 /*yield*/, this.repository.list(deviceId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.json(res, result)];
                    case 2:
                        err_3 = _a.sent();
                        this.logger.error(err_3);
                        return [2 /*return*/, this.jsonError(res, 500, { error: err_3 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.get = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var id, result, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.debug('Received request for connection details');
                        id = parseInt(req.params.id);
                        return [4 /*yield*/, this.repository.get(id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.json(res, result)];
                    case 2:
                        err_4 = _a.sent();
                        this.logger.error(err_4);
                        return [2 /*return*/, this.jsonError(res, 500, { error: err_4 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.save = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var obj, result, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.debug('Received request for connection save');
                        obj = new models_1.Connection(req.body);
                        return [4 /*yield*/, this.repository.save(obj)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.json(res, result)];
                    case 2:
                        err_5 = _a.sent();
                        this.logger.error(err_5);
                        return [2 /*return*/, this.jsonError(res, 500, { error: err_5 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.delete = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var id, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.debug('Received request for connection delete');
                        id = parseInt(req.params.id);
                        return [4 /*yield*/, this.repository.delete(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.json(res, { success: true })];
                    case 2:
                        err_6 = _a.sent();
                        this.logger.error(err_6);
                        return [2 /*return*/, this.jsonError(res, 500, { error: err_6 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ConnectionController = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('serverSettings')),
        tslib_1.__param(2, inversify_1.inject('database')),
        tslib_1.__param(3, inversify_1.inject('connectionRepository')),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object, repositories_1.ConnectionRepository])
    ], ConnectionController);
    return ConnectionController;
}(base_controller_1.BaseController));
exports.ConnectionController = ConnectionController;
//# sourceMappingURL=connection.controller.js.map