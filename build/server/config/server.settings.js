"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSettings = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var inversify_1 = require("inversify");
var logLevel_enum_1 = require("../models/logLevel.enum");
var ServerSettings = /** @class */ (function () {
    function ServerSettings() {
        this.port = 3000;
        this.enableLogging = true;
        this.logLevel = logLevel_enum_1.LogLevel.DEBUG;
        this.extendedUrlEncoding = false;
        this.defaultPageSize = 20;
    }
    ServerSettings = tslib_1.__decorate([
        inversify_1.injectable()
    ], ServerSettings);
    return ServerSettings;
}());
exports.ServerSettings = ServerSettings;
//# sourceMappingURL=server.settings.js.map