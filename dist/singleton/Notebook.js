"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notebook = void 0;
const Notebook_1 = __importDefault(require("./../Notebook"));
class SingletonNotebook extends Notebook_1.default {
    update(note, oldWords) {
        const notebook = super.update(note, oldWords);
        this.dictionary = notebook.dictionary;
        this.notes = notebook.notes;
        return this;
    }
}
exports.Notebook = new SingletonNotebook();
