import INote from './INote';
import NotebookItem from './NotebookItem';
declare class Mention extends NotebookItem {
    from: INote;
    to: INote;
    key: string;
    createdByUser: boolean;
    constructor(from: INote, to: INote, key: string, createdByUser?: boolean, uuid?: string, createdAt?: Date, modifiedAt?: Date);
}
export default Mention;
