"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var BaseRepository = /** @class */ (function () {
    function BaseRepository(logger, database) {
        this.logger = logger;
        this.database = database;
    }
    BaseRepository = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('logger')),
        tslib_1.__param(1, inversify_1.inject('database')),
        tslib_1.__metadata("design:paramtypes", [Object, Object])
    ], BaseRepository);
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map