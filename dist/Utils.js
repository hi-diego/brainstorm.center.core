"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.references = exports.mentions = exports.updateDictionary = exports.uuid = exports.wordsDiff = void 0;
const immutable_1 = __importDefault(require("immutable"));
const Mention_1 = __importDefault(require("./Mention"));
function wordsDiff(a, b) {
    return {
        gone: a.subtract(b),
        new: b.subtract(a)
    };
}
exports.wordsDiff = wordsDiff;
function uuid() {
    var date = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        var random = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
exports.uuid = uuid;
function updateDictionary(note, dictionary, oldNote) {
    var dic = immutable_1.default.Map(dictionary);
    const words = wordsDiff(oldNote.words(), note.words());
    words.gone.forEach((word) => {
        const set = (dic.get(word, immutable_1.default.Set())).delete(note.title);
        if (set.isEmpty())
            dic = dic.delete(word);
        else
            dic = dic.set(word, set);
    });
    words.new.forEach((word) => {
        const set = (dic.get(word, immutable_1.default.Set())).add(note.title);
        dic = dic.set(word, set);
    });
    return dic;
}
exports.updateDictionary = updateDictionary;
function mentions(note, notes) {
    console.log(notes.toArray(), note.words().toArray());
    return notes
        .filter((v, k) => note.words().has(k.toLowerCase()))
        .toSet()
        .map(n => new Mention_1.default(note, n, n.title.toLowerCase()))
        .concat(note.mentions);
}
exports.mentions = mentions;
function references(note, notes, dictionary) {
    return dictionary.get(note.title.toLowerCase(), immutable_1.default.Set()).map(title => notes.get(title.toLowerCase()));
}
exports.references = references;
