"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterUtility = void 0;
var tslib_1 = require("tslib");
var inversify_1 = require("inversify");
var node_ssh_1 = require("node-ssh");
var RouterUtility = /** @class */ (function () {
    function RouterUtility(settings) {
        this.settings = settings;
    }
    RouterUtility.prototype.listSettings = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var connection, raw, lines, result;
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
                        return [4 /*yield*/, connection.exec("nvram show", ["| grep = | grep -v -e =$ | awk -F '=' '{print $1}' | sort -f | (IFS=''; while read VAR; do VAL=$(nvram get ${VAR}); [ -n \"$VAL\" ] && printf '%s='\''%s'\''\n' ${VAR} ${VAL/\'/\'\\\'\'}; done)"])];
                    case 2:
                        raw = _a.sent();
                        lines = raw.split('\n');
                        result = [];
                        // for(let i = 0; i < lines.length; i++){
                        // 	const line = lines[i];
                        // 	const parts = line.split('==');
                        // 	result.push(new Setting({ key: parts[0], value: parts[1]}));
                        // }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    RouterUtility = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('routerSettings')),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], RouterUtility);
    return RouterUtility;
}());
exports.RouterUtility = RouterUtility;
/// ROAST BEEF SWIFF MAYO LETTUCE
//# sourceMappingURL=router.util.js.map