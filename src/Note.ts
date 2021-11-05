import Immutable from 'immutable';
import Mention from './Mention';
console.log("Mention", Mention);
import NotebookItem from './NotebookItem';
import INote from './INote';
import { clone, words } from './Utils';

/**
 * Note class is the holder of Mentions.
 * @class
 */
class Note extends NotebookItem implements INote {

  public title: string;
  public content: string = '';

  constructor (title: string, content: string, uuid?: string, createdAt?: Date, modifiedAt?: Date) {
    super(uuid, createdAt, modifiedAt);
    this.title = title;
    this.content = content;
  }

  /**
   * Return all the words in the content.
   */
  public words () : Immutable.Set<string> {
    return words(this);
  }

  /**
   * Return all the words in the content.
   */
  public clone () : INote {
    return clone(this);
  }
}

export default Note;