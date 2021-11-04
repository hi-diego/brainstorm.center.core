import Immutable from 'immutable';
import Note from './Note';
import Mention from './Mention';
export declare type Words = {
    gone: Immutable.Set<string>;
    new: Immutable.Set<string>;
};
export declare function wordsDiff(a: Immutable.Set<string>, b: Immutable.Set<string>): Words;
export declare function uuid(): string;
export declare function updateDictionary(note: Note, dictionary: Immutable.Map<string, Immutable.Set<string>>, oldNote: Note): Immutable.Map<string, Immutable.Set<string>>;
export declare function mentions(note: Note, notes: Immutable.Map<string, Note>): Immutable.Set<Mention>;
export declare function references(note: Note, notes: Immutable.Map<string, Note>, dictionary: Immutable.Map<string, Immutable.Set<string>>): Immutable.Set<Note | undefined>;
