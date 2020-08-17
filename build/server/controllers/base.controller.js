"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var inversify_1 = require("inversify");
var BaseController = /** @class */ (function () {
    function BaseController(logger, settings, database) {
        this.logger = logger;
        this.settings = settings;
        this.database = database;
    }
    /** Sends JSON back to the client with a 200 status. */
    BaseController.prototype.json = function (res, obj) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(obj);
    };
    /** Sends JSON back to the client with the specified status. */
    BaseController.prototype.jsonError = function (res, status, obj) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(status).json(obj);
    };
    BaseController = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('serverSettings')),
        tslib_1.__param(2, inversify_1.inject('database')),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
    ], BaseController);
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map