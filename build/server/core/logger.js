"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var inversify_1 = require("inversify");
var logLevel_enum_1 = require("../models/logLevel.enum");
var chalk = require("chalk");
var Logger = /** @class */ (function () {
    /**
     * Creates a new instance of the Logger class.
     * @param settings Global application settings
     * @param logFunction The function responsible for actually doing the logging.
     */
    function Logger(settings, logFunction) {
        this.settings = settings;
        this.logFunction = logFunction;
    }
    /**
     * Logs the specified debug statement
     * @param message the statement to log.
     */
    Logger.prototype.debug = function (message, style) {
        if (this.settings.logLevel <= logLevel_enum_1.LogLevel.DEBUG)
            this.logFunction(chalk.magenta.bold('[DEBUG] ') + chalk.magenta(message));
    };
    /**
     * Logs the specified info statement
     * @param message the statement to log.
     */
    Logger.prototype.info = function (message, style) {
        if (this.settings.logLevel <= logLevel_enum_1.LogLevel.INFO)
            this.logFunction(chalk.blue.bold('[INFO] ') + chalk.blue(message));
    };
    /**
     * Logs the specified warning statement
     * @param message the statement to log.
     */
    Logger.prototype.warn = function (message, style) {
        if (this.settings.logLevel <= logLevel_enum_1.LogLevel.WARN)
            this.logFunction(chalk.yellow.bold('[WARN] ') + chalk.yellow(message));
    };
    /**
     * Logs the specified error statement
     * @param message the statement to log.
     */
    Logger.prototype.error = function (message, style) {
        if (this.settings.logLevel <= logLevel_enum_1.LogLevel.ERROR)
            this.logFunction(chalk.red.bold('[ERROR] ') + chalk.red(message));
    };
    Logger = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('IServerSettings')),
        tslib_1.__metadata("design:paramtypes", [Object, Function])
    ], Logger);
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map