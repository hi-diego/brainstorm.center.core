"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotebookItem_1 = __importDefault(require("./NotebookItem"));
class Mention extends NotebookItem_1.default {
    constructor(from, to, key, createdByUser = false, uuid, createdAt, modifiedAt) {
        super(uuid, createdAt, modifiedAt);
        this.from = from;
        this.to = to;
        this.key = key;
        this.createdByUser = createdByUser;
    }
}
exports.default = Mention;
