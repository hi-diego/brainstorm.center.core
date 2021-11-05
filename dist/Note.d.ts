import Immutable from 'immutable';
import NotebookItem from './NotebookItem';
import INote from './INote';
declare class Note extends NotebookItem implements INote {
    title: string;
    content: string;
    constructor(title: string, content: string, uuid?: string, createdAt?: Date, modifiedAt?: Date);
    words(): Immutable.Set<string>;
    clone(): INote;
}
export default Note;
