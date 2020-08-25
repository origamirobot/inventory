"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterSettings = void 0;
var RouterSettings = /** @class */ (function () {
    function RouterSettings() {
        this.routerAddress = '192.168.11.1';
        this.sshKeyLocation = 'c:\\Users\\chris\\.ssh\\id_rsa';
        this.chainRegex = /(?:Chain\s)(?<chain>\w+)(?:.*\(policy)\s+(?<policy>\w+)\s+(?<packets>[0-9]+)(?:.*\packets,)\s+(?<bytes>[0-9]+)\s+/;
        this.ruleRegex = /(?<id>\d+)\s+(?<packets>\w+)\s+(?<bytes>\w+)\s+(?<target>\w+)\s+(?<protocol>\w+)\s+(?<opt>[\w-]+)\s+(?<in>\w+)\s+(?<out>\w+)\s+(?<source>[0-9\.\/a-zA-Z]+)\s+(?<destination>[0-9\.\/a-zA-Z]+)\s*(?<options>.+)/;
    }
    return RouterSettings;
}());
exports.RouterSettings = RouterSettings;
//# sourceMappingURL=router.settings.js.map