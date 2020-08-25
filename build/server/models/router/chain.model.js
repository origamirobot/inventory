"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chain = void 0;
/**
 * A chain is a string of rules. When a packet is received, iptables finds the appropriate
 * table, then runs it through the chain of rules until it finds a match.
 */
var Chain = /** @class */ (function () {
    function Chain(init) {
        Object.assign(this, init);
    }
    return Chain;
}());
exports.Chain = Chain;
//# sourceMappingURL=chain.model.js.map