import Immutable from 'immutable';
import Note from './Note';
import INote from './INote';
import Mention from './Mention';
import { wordsDiff, updateDictionary, mentions, references, update } from './Utils';

/**
 * Notebook.
 * @class
 */
class Notebook {

  /**
   * Notebook.
   * @member
   */
  public name: string;

  /**
   * Notebook.
   * @member
   */
  public notes: Immutable.Map<string, INote>;

  /**
   * Notebook.
   * @member
   */
  public dictionary: Immutable.Map<string, Immutable.Set<string>>;

  /**
   * Notebook.
   * @member
   */
  public onUpdate: (notes: Immutable.Set<INote>) => void;

  /**
   * Notebook.
   * @constructor
   */
  constructor (notes?: Immutable.Map<string, INote>, dictionary?: Immutable.Map<string, Immutable.Set<string>>) {
    this.notes = notes || Immutable.Map<string, INote>();
    this.dictionary = dictionary || Immutable.Map<string, Immutable.Set<string>>();
    this.name = 'root';
    // console.log(this.notes, this.dictionary);
    this.onUpdate = () => null;
  }

  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public update(note: INote, oldWords?: Immutable.Set<string>): Notebook {
    return update(this, note, oldWords);
  }

  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public get(title: string): INote|undefined {
    return this.notes.get(title.toLowerCase());
  }

  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public set(note: INote) {
    this.notes.set(note.title.toLowerCase(), note);
  }

  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public add(notes: INote[]): Notebook {
    var notebook: Notebook = this;
    notes.forEach((note: INote) => (notebook = notebook.update(note)));
    return notebook;
  }

  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public getLocalStorageName(): string {
    const path = window.location.pathname && window.location.pathname !== '/'
      ? (window.location.pathname + '/')
      : '';
    return `brainstorm.center/${path}`;
  }

  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public updateDictionary(note: INote, oldWords: Immutable.Set<string>): Immutable.Map<string, Immutable.Set<string>> {
    return updateDictionary(note, this.dictionary, oldWords);
  }

  /**
   * Load data from the local storage to the noptebook instance:
   *
   */
  public load(notebookName: string = 'root') {
    this.name = notebookName;
    const notes = JSON.parse(window.localStorage.getItem(this.getLocalStorageName()) || '{}')
    for (const title in notes) {
      const n = notes[title];
      const note = new Note(n.title, n._content, n.uuid, n.createdAt);
    }
  }

  /**
   * Load data from the local storage to the noptebook instance:
   *
   */
  public reload(notebookName: string = 'root') {
    this.name = notebookName;
    this.dictionary = Immutable.Map<string, Immutable.Set<string>>();
    this.notes = Immutable.Map<string, INote>();
    this.load(notebookName);
  }

  /**
   * Return all the title notes that this note mentions in its content.
   */
  public mentions(note: INote) : Immutable.Set<Mention> {
    return mentions(note, this.notes);
  }

  /**
   * Alias of mentions
   */
  public getMentionsOf(note: INote) : Immutable.Set<Mention> {
    return this.mentions(note);
  }

  /**
   * Return all the notes that reference this note by the title.
   */
  public references(note: INote) : Immutable.Set<INote|undefined> {
    return references(note, this.notes, this.dictionary);
  }

  /**
   * Alias of references
   */
  public getReferencesOf(note: INote) : Immutable.Set<INote|undefined> {
    return this.references(note);
  }
}

export default Notebook;