"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var inversify_1 = require("inversify");
var Banner = /** @class */ (function () {
    function Banner() {
    }
    Banner.prototype.show = function () {
    };
    Banner = tslib_1.__decorate([
        inversify_1.injectable()
    ], Banner);
    return Banner;
}());
exports.Banner = Banner;
//# sourceMappingURL=banner.js.map