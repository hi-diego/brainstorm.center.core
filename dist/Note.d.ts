import Immutable from 'immutable';
import Mention from './Mention';
import NotebookItem from './NotebookItem';
declare class Note extends NotebookItem {
    title: string;
    content: string;
    mentions: Immutable.Set<Mention>;
    constructor(title: string, content: string, uuid?: string, mentions?: Immutable.Set<Mention>, createdAt?: Date, modifiedAt?: Date);
    words(prev?: boolean): Immutable.Set<string>;
    clone(from?: Note): Note;
}
export default Note;
