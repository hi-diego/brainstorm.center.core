import Immutable from 'immutable';
import Note from './Note';
import INote from './INote';
import Mention from './Mention';
import Notebook from './Notebook';
export declare type Words = {
    gone: Immutable.Set<string>;
    new: Immutable.Set<string>;
};
export declare function wordsDiff(a: Immutable.Set<string>, b: Immutable.Set<string>): Words;
export declare function uuid(): string;
export declare function updateDictionary(note: Note, dictionary: Immutable.Map<string, Immutable.Set<string>>, oldWords: Immutable.Set<string>): Immutable.Map<string, Immutable.Set<string>>;
export declare function mentions(note: INote, notes: Immutable.Map<string, INote>): Immutable.Set<Mention>;
export declare function references(note: INote, notes: Immutable.Map<string, INote>, dictionary: Immutable.Map<string, Immutable.Set<string>>): Immutable.Set<INote | undefined>;
export declare function update(notebook: Notebook, note: INote, oldWords?: Immutable.Set<string>): Notebook;
export declare function clone(from: INote): INote;
export declare function words(note: INote): Immutable.Set<string>;
