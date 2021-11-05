import Immutable from 'immutable';
import INote from './INote';
import Mention from './Mention';
declare class Notebook {
    name: string;
    notes: Immutable.Map<string, INote>;
    dictionary: Immutable.Map<string, Immutable.Set<string>>;
    onUpdate: (notes: Immutable.Set<INote>) => void;
    constructor(notes?: Immutable.Map<string, INote>, dictionary?: Immutable.Map<string, Immutable.Set<string>>);
    update(note: INote, oldWords?: Immutable.Set<string>): Notebook;
    get(title: string): INote | undefined;
    set(note: INote): void;
    add(notes: INote[]): Notebook;
    getLocalStorageName(): string;
    updateDictionary(note: INote, oldWords: Immutable.Set<string>): Immutable.Map<string, Immutable.Set<string>>;
    load(notebookName?: string): void;
    reload(notebookName?: string): void;
    mentions(note: INote): Immutable.Set<Mention>;
    getMentionsOf(note: INote): Immutable.Set<Mention>;
    references(note: INote): Immutable.Set<INote | undefined>;
    getReferencesOf(note: INote): Immutable.Set<INote | undefined>;
}
export default Notebook;
