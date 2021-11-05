import INote from '../INote';
import NotebookItem from '../NotebookItem';
import Immutable from 'immutable';
declare class Note extends NotebookItem implements INote {
    #private;
    constructor(title: string, content: string, uuid?: string, createdAt?: Date, modifiedAt?: Date);
    get title(): string;
    set title(title: string);
    get content(): string;
    set content(content: string);
    setContent(content: string): this;
    words(): Immutable.Set<string>;
    clone(): INote;
}
export default Note;
export declare const NoteProxyHandler: {
    construct: (target: any, args: any[]) => any;
};
export declare const NoteProxy: any;
