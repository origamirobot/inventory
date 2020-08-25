"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
/**
 * A target is what happens after a packet matches a rule criteria.
 */
var Target;
(function (Target) {
    /** Firewall will accept this packet */
    Target[Target["Accept"] = 0] = "Accept";
    /** Firewall drops the packet and pretends it never received it */
    Target[Target["Drop"] = 1] = "Drop";
    /** Firewall will stop executing the next set of rules in the current chain for this packet */
    Target[Target["Return"] = 2] = "Return";
    /** Firewall will pass the packet to the userspace */
    Target[Target["Queue"] = 3] = "Queue";
})(Target = exports.Target || (exports.Target = {}));
//# sourceMappingURL=target.model.js.map