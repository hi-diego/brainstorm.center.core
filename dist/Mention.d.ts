import Note from './Note';
import NotebookItem from './NotebookItem';
declare class Mention extends NotebookItem {
    from: Note;
    to: Note;
    key: string;
    createdByUser: boolean;
    constructor(from: Note, to: Note, key: string, createdByUser?: boolean, uuid?: string, createdAt?: Date, modifiedAt?: Date);
}
export default Mention;
