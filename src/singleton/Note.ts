import INote from '../INote';
import NotebookItem from '../NotebookItem';
import { SingletonNotebook } from './SingletonNotebook';
import Immutable from 'immutable';

/**
 * Note class is the holder of Mentions.
 * @class
 */
class StickyNote extends NotebookItem implements INote {
  
  #title: string = '';
  #content: string = '';

  constructor (title: string, content: string, uuid?: string, createdAt?: Date, modifiedAt?: Date) {
    super(uuid, createdAt, modifiedAt);
    this.title = title;
    this.content = content;
  }

  public get title(): string {
    return this.#title;
  }

  public set title(title: string) {
    this.#title = title;
  }

  public get content(): string {
    return this.#content;
  }

  public set content(content: string) {
    const words = this.words();
    this.#content = content;
    SingletonNotebook.update(this, words);
  }

  /**
   * Return all the words in the content.
   */
  public words (prev: boolean = false) : Immutable.Set<string> {
    const words = this.content.toLowerCase().replace(/((\W)(\s|$))/g, '').split(/\s+/g) || [];
    return Immutable.Set<string>(words);
  }
}
