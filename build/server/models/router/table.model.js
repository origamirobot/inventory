"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityTable = exports.MangleTable = exports.NatTable = exports.FilterTable = exports.Table = void 0;
var tslib_1 = require("tslib");
/**
 * Tables are files that join similar actions. A table consists of several chains
 */
var Table = /** @class */ (function () {
    function Table(init) {
        this.chains = [];
        Object.assign(this, init);
    }
    return Table;
}());
exports.Table = Table;
/** The Filter table is the most frequently used one. It acts as a bouncer, deciding who gets in and out of your network. */
var FilterTable = /** @class */ (function (_super) {
    tslib_1.__extends(FilterTable, _super);
    function FilterTable(init) {
        var _this = _super.call(this) || this;
        Object.assign(_this, init);
        return _this;
    }
    return FilterTable;
}(Table));
exports.FilterTable = FilterTable;
/**
 * This table contains NAT (Network Address Translation) rules for routing packets to networks that cannot be accessed directly.
 * When the destination or source of the packet has to be altered, the NAT table is used. It includes the following chains:
 */
var NatTable = /** @class */ (function (_super) {
    tslib_1.__extends(NatTable, _super);
    function NatTable(init) {
        var _this = _super.call(this) || this;
        Object.assign(_this, init);
        return _this;
    }
    return NatTable;
}(Table));
exports.NatTable = NatTable;
/** The Raw table is used to exempt packets from connection tracking.  */
var MangleTable = /** @class */ (function (_super) {
    tslib_1.__extends(MangleTable, _super);
    function MangleTable(init) {
        var _this = _super.call(this) || this;
        Object.assign(_this, init);
        return _this;
    }
    return MangleTable;
}(Table));
exports.MangleTable = MangleTable;
/** Some versions of Linux also use a Security table to manage special access rules.  */
var SecurityTable = /** @class */ (function (_super) {
    tslib_1.__extends(SecurityTable, _super);
    function SecurityTable(init) {
        var _this = _super.call(this) || this;
        Object.assign(_this, init);
        return _this;
    }
    return SecurityTable;
}(Table));
exports.SecurityTable = SecurityTable;
//# sourceMappingURL=table.model.js.map