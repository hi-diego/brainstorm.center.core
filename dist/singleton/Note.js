"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _title, _content;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteProxy = exports.NoteProxyHandler = void 0;
const NotebookItem_1 = __importDefault(require("../NotebookItem"));
const Notebook_1 = require("./Notebook");
const Utils_1 = require("../Utils");
class Note extends NotebookItem_1.default {
    constructor(title, content, uuid, createdAt, modifiedAt) {
        super(uuid, createdAt, modifiedAt);
        _title.set(this, '');
        _content.set(this, '');
        this.title = title;
        this.content = content;
    }
    get title() {
        return __classPrivateFieldGet(this, _title);
    }
    set title(title) {
        __classPrivateFieldSet(this, _title, title);
    }
    get content() {
        return __classPrivateFieldGet(this, _content);
    }
    set content(content) {
        const words = this.words();
        __classPrivateFieldSet(this, _content, content);
        Notebook_1.Notebook.update(this, words);
    }
    setContent(content) {
        this.content = content;
        return this;
    }
    words() {
        return Utils_1.words(this);
    }
    clone() {
        return Utils_1.clone(this);
    }
}
_title = new WeakMap(), _content = new WeakMap();
exports.default = Note;
exports.NoteProxyHandler = {
    construct: (target, args) => {
        const old = Notebook_1.Notebook.get(args[0]);
        if (old)
            return old.setContent(args[1]);
        return new Note(args[0], args[1]);
    }
};
exports.NoteProxy = new Proxy(Note, exports.NoteProxyHandler);
