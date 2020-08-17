"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagedResult = void 0;
var PagedResult = /** @class */ (function () {
    function PagedResult(init) {
        this.pageIndex = 0;
        this.pageNumber = 0;
        this.pageSize = 0;
        this.totalPages = 0;
        Object.assign(this, init);
    }
    return PagedResult;
}());
exports.PagedResult = PagedResult;
//# sourceMappingURL=pagedResult.model.js.map