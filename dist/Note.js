"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = __importDefault(require("immutable"));
const Mention_1 = __importDefault(require("./Mention"));
console.log("Mention", Mention_1.default);
const NotebookItem_1 = __importDefault(require("./NotebookItem"));
class Note extends NotebookItem_1.default {
    constructor(title, content, uuid, mentions, createdAt, modifiedAt) {
        super(uuid, createdAt, modifiedAt);
        this.content = '';
        this.mentions = mentions || immutable_1.default.Set();
        this.title = title;
        this.content = content;
    }
    words(prev = false) {
        const words = this.content.split(' ');
        return immutable_1.default.Set(words);
    }
    clone(from) {
        return new Note(this.title, this.content, (from && from.uuid) || this.uuid, this.mentions, this.createdAt, this.modifiedAt);
    }
}
exports.default = Note;
