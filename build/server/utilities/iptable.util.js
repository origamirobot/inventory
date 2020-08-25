"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpTableUtility = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var router_1 = require("../models/router");
var node_ssh_1 = require("node-ssh");
var IpTableUtility = /** @class */ (function () {
    function IpTableUtility(settings) {
        this.settings = settings;
    }
    IpTableUtility.prototype.getFilterTable = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var connection, raw, lines, result, currentChain, i, line, match, chain, match, rule;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = new node_ssh_1.NodeSSH();
                        return [4 /*yield*/, connection.connect({
                                host: '192.168.11.1',
                                username: 'root',
                                privateKey: "c:\\Users\\chris\\.ssh\\id_rsa",
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, connection.exec('iptables', ['-L', '--line-numbers', '--verbose', '--table', 'filter'])];
                    case 2:
                        raw = _a.sent();
                        lines = raw.split('\n');
                        result = new router_1.FilterTable();
                        currentChain = new router_1.Chain();
                        for (i = 0; i < lines.length; i++) {
                            line = lines[i];
                            if (this.settings.chainRegex.test(line)) {
                                match = line.match(this.settings.chainRegex);
                                chain = new router_1.Chain({
                                    name: match.groups['chain'],
                                    defaultPolicy: match.groups['policy'],
                                    packets: match.groups['packets'],
                                    bytes: match.groups['bytes'],
                                    rules: [],
                                });
                                switch (chain.name) {
                                    case 'INPUT':
                                        result.input = chain;
                                        break;
                                    case 'OUTPUT':
                                        result.output = chain;
                                        break;
                                    case 'FORWARD':
                                        result.forward = chain;
                                        break;
                                }
                                result.chains.push(chain);
                                currentChain = chain;
                            }
                            else if (this.settings.ruleRegex.test(line)) {
                                match = line.match(this.settings.ruleRegex);
                                rule = new router_1.Rule({
                                    destination: match.groups['destination'],
                                    number: parseInt(match.groups['id']),
                                    options: match.groups['options'],
                                    protocol: match.groups['protocol'],
                                    source: match.groups['source'],
                                    target: match.groups['target'],
                                    packets: match.groups['packets'],
                                    bytes: match.groups['bytes'],
                                    in: match.groups['in'],
                                    out: match.groups['out'],
                                });
                                currentChain.rules.push(rule);
                            }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    IpTableUtility = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('routerSettings')),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], IpTableUtility);
    return IpTableUtility;
}());
exports.IpTableUtility = IpTableUtility;
//# sourceMappingURL=iptable.util.js.map