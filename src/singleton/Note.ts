import INote from '../INote';
import NotebookItem from '../NotebookItem';
import { Notebook } from './Notebook';
import Immutable from 'immutable';
import { clone, words } from '../Utils';
/**
 * Note class is the holder of Mentions.
 * @class
 */
class Note extends NotebookItem implements INote {
  /**
   * Note class is the holder of Mentions.
   * @class
   */
  #title: string = '';
  /**
   * Note class is the holder of Mentions.
   * @class
   */
  #content: string = '';
  /**
   * Note class is the holder of Mentions.
   * @class
   */
  constructor (title: string, content: string, uuid?: string, createdAt?: Date, modifiedAt?: Date) {
    super(uuid, createdAt, modifiedAt);
    this.title = title;
    this.content = content;
  }
  /**
   * Note class is the holder of Mentions.
   * @class
   */
  public get title(): string {
    return this.#title;
  }
  /**
   * Note class is the holder of Mentions.
   * @class
   */
  public set title(title: string) {
    this.#title = title;
  }
  /**
   * Note class is the holder of Mentions.
   * @class
   */
  public get content(): string {
    return this.#content;
  }
  /**
   * Note class is the holder of Mentions.
   * @class
   */
  public set content(content: string) {
    const words = this.words();
    this.#content = content;
    Notebook.update(this, words);
  }
  /**
   * Note class is the holder of Mentions.
   * @class
   */
  public setContent(content: string) {
    this.content = content;
    return this;
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
  /**
   * Return all the words in the content.
   */
  // public toString () {
  //   return "[object Foo]";
  // }
}
/**
 * Note class is the holder of Mentions.
 * @class
 */
export default Note;
/**
 * Note class is the holder of Mentions.
 * @class
 */
export const NoteProxyHandler = {
  /**
   * Note class is the holder of Mentions.
   * @class
   */
  construct: (target: any, args: any[]) => {
    const old: any = Notebook.get(args[0]);
    if (old) return old.setContent(args[1]);
    return new Note(args[0], args[1]);
  }
};
/**
 * Note class is the holder of Mentions.
 * @class
 */
export const NoteProxy = new Proxy(Note, NoteProxyHandler);
