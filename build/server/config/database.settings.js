"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSettings = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var inversify_1 = require("inversify");
var DatabaseSettings = /** @class */ (function () {
    function DatabaseSettings() {
        this.fileLocation = '../../../devices.s3db';
        this.fileMustExist = true;
        this.verbose = true;
    }
    DatabaseSettings = tslib_1.__decorate([
        inversify_1.injectable()
    ], DatabaseSettings);
    return DatabaseSettings;
}());
exports.DatabaseSettings = DatabaseSettings;
//# sourceMappingURL=database.settings.js.map