"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = __importDefault(require("immutable"));
const Note_1 = __importDefault(require("./Note"));
const Utils_1 = require("./Utils");
class Notebook {
    constructor(notes, dictionary) {
        this.notes = notes || immutable_1.default.Map();
        this.dictionary = dictionary || immutable_1.default.Map();
        this.name = 'root';
        this.onUpdate = () => null;
    }
    update(note, oldWords) {
        return Utils_1.update(this, note, oldWords);
    }
    get(title) {
        return this.notes.get(title.toLowerCase());
    }
    set(note) {
        this.notes.set(note.title.toLowerCase(), note);
    }
    add(notes) {
        var notebook = this;
        notes.forEach((note) => (notebook = notebook.update(note)));
        return notebook;
    }
    getLocalStorageName() {
        const path = window.location.pathname && window.location.pathname !== '/'
            ? (window.location.pathname + '/')
            : '';
        return `brainstorm.center/${path}`;
    }
    updateDictionary(note, oldWords) {
        return Utils_1.updateDictionary(note, this.dictionary, oldWords);
    }
    load(notebookName = 'root') {
        this.name = notebookName;
        const notes = JSON.parse(window.localStorage.getItem(this.getLocalStorageName()) || '{}');
        for (const title in notes) {
            const n = notes[title];
            const note = new Note_1.default(n.title, n._content, n.uuid, n.createdAt);
        }
    }
    reload(notebookName = 'root') {
        this.name = notebookName;
        this.dictionary = immutable_1.default.Map();
        this.notes = immutable_1.default.Map();
        this.load(notebookName);
    }
    mentions(note) {
        return Utils_1.mentions(note, this.notes);
    }
    getMentionsOf(note) {
        return this.mentions(note);
    }
    references(note) {
        return Utils_1.references(note, this.notes, this.dictionary);
    }
    getReferencesOf(note) {
        return this.references(note);
    }
}
exports.default = Notebook;
