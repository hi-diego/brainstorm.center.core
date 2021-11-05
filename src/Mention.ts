import INote from './INote';
import NotebookItem from './NotebookItem';

/**
 * Mention.
 * @class
 */
class Mention extends NotebookItem {

  public from: INote;
  public to: INote;
  public key: string;
  public createdByUser: boolean;

  constructor (from: INote, to: INote, key: string, createdByUser: boolean = false, uuid?: string, createdAt?: Date, modifiedAt?: Date) {
    super(uuid, createdAt, modifiedAt);
    this.from = from;
    this.to = to;
    this.key = key;
    this.createdByUser = createdByUser;
  }
}

export default Mention;