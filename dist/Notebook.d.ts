import Immutable from 'immutable';
import Note from './Note';
import Mention from './Mention';
declare class Notebook {
    name: string;
    notes: Immutable.Map<string, Note>;
    dictionary: Immutable.Map<string, Immutable.Set<string>>;
    onUpdate: (notes: Immutable.Set<Note>) => void;
    constructor(notes?: Immutable.Map<string, Note>, dictionary?: Immutable.Map<string, Immutable.Set<string>>);
    update(n: Note): Notebook;
    getLocalStorageName(): string;
    updateDictionary(note: Note, oldNote: Note): Immutable.Map<string, Immutable.Set<string>>;
    load(notebookName?: string): void;
    reload(notebookName?: string): void;
    mentions(note: Note): Immutable.Set<Mention>;
    references(note: Note): Immutable.Set<Note | undefined>;
}
export default Notebook;
