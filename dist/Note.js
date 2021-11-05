"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mention_1 = __importDefault(require("./Mention"));
console.log("Mention", Mention_1.default);
const NotebookItem_1 = __importDefault(require("./NotebookItem"));
const Utils_1 = require("./Utils");
class Note extends NotebookItem_1.default {
    constructor(title, content, uuid, createdAt, modifiedAt) {
        super(uuid, createdAt, modifiedAt);
        this.content = '';
        this.title = title;
        this.content = content;
    }
    words() {
        return Utils_1.words(this);
    }
    clone() {
        return Utils_1.clone(this);
    }
}
exports.default = Note;
