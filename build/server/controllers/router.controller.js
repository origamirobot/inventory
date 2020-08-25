"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterController = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var inversify_1 = require("inversify");
var base_controller_1 = require("./base.controller");
var repositories_1 = require("../repositories");
var RouterController = /** @class */ (function (_super) {
    tslib_1.__extends(RouterController, _super);
    function RouterController(logger, settings, database, repository, ipTableUtility, routerUtility) {
        var _this = _super.call(this, logger, settings, database) || this;
        _this.logger = logger;
        _this.settings = settings;
        _this.database = database;
        _this.repository = repository;
        _this.ipTableUtility = ipTableUtility;
        _this.routerUtility = routerUtility;
        _this.iptables = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var table, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ipTableUtility.getFilterTable()];
                    case 1:
                        table = _a.sent();
                        return [2 /*return*/, this.json(res, table)];
                    case 2:
                        err_1 = _a.sent();
                        this.logger.error(err_1);
                        return [2 /*return*/, this.jsonError(res, 500, { error: err_1 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.listSettings = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var table, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.routerUtility.listSettings()];
                    case 1:
                        table = _a.sent();
                        return [2 /*return*/, this.json(res, table)];
                    case 2:
                        err_2 = _a.sent();
                        this.logger.error(err_2);
                        return [2 /*return*/, this.jsonError(res, 500, { error: err_2 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    RouterController = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('serverSettings')),
        tslib_1.__param(2, inversify_1.inject('database')),
        tslib_1.__param(3, inversify_1.inject('deviceRepository')),
        tslib_1.__param(4, inversify_1.inject('ipTableUtility')),
        tslib_1.__param(5, inversify_1.inject('routerUtility')),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object, repositories_1.DeviceRepository, Object, Object])
    ], RouterController);
    return RouterController;
}(base_controller_1.BaseController));
exports.RouterController = RouterController;
//# sourceMappingURL=router.controller.js.map