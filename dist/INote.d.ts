import INotebookItem from './INotebookItem';
import Immutable from 'immutable';
export default interface INote extends INotebookItem {
    title: string;
    content: string;
    words: () => Immutable.Set<string>;
    clone: (from?: INote) => INote;
}
