"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
class NotebookItem {
    constructor(_uuid, createdAt, modified_at) {
        this.uuid = _uuid || Utils_1.uuid();
        this.createdAt = createdAt || (new Date());
        this.modifiedAt = this.createdAt;
    }
}
exports.default = NotebookItem;
