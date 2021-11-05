import Immutable from 'immutable';
import Note from './Note';
import Mention from './Mention';
import { wordsDiff, updateDictionary, mentions, references } from './Utils';

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
  public notes: Immutable.Map<string, Note>;

  /**
   * Notebook.
   * @member
   */
  public dictionary: Immutable.Map<string, Immutable.Set<string>>;

  /**
   * Notebook.
   * @member
   */
  public onUpdate: (notes: Immutable.Set<Note>) => void;

  /**
   * Notebook.
   * @constructor
   */
  constructor (notes?: Immutable.Map<string, Note>, dictionary?: Immutable.Map<string, Immutable.Set<string>>) {
    this.notes = notes || Immutable.Map<string, Note>();
    this.dictionary = dictionary || Immutable.Map<string, Immutable.Set<string>>();
    this.name = 'root';
    // console.log(this.notes, this.dictionary);
    this.onUpdate = () => null;
  }

  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public update(note: Note): Notebook {
    const oldNote = this.get(note.title);
    const dictionary = this.updateDictionary(note, oldNote || new Note('', ''));
    const notes = this.notes.set(note.title.toLowerCase(), note);
    // window.localStorage.setItem(this.getLocalStorageName(), JSON.stringify(this.notes.toJSON()));
    return new Notebook(notes, dictionary);
  }

  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public get(title: string): Note|undefined {
    return this.notes.get(title.toLowerCase());
  }

  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public set(note: Note) {
    this.notes.set(note.title.toLowerCase(), note);
  }

  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public add(notes: Note[]): Notebook {
    var notebook: Notebook = this;
    notes.forEach((note: Note) => (notebook = notebook.update(note)));
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
  public updateDictionary(note: Note, oldNote: Note): Immutable.Map<string, Immutable.Set<string>> {
    return updateDictionary(note, this.dictionary, oldNote);
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
    this.notes = Immutable.Map<string, Note>();
    this.load(notebookName);
  }

  /**
   * Return all the title notes that this note mentions in its content.
   */
  public mentions(note: Note) : Immutable.Set<Mention> {
    return mentions(note, this.notes);
  }

  /**
   * Alias of mentions
   */
  public getMentionsOf(note: Note) : Immutable.Set<Mention> {
    return this.mentions(note);
  }

  /**
   * Return all the notes that reference this note by the title.
   */
  public references(note: Note) : Immutable.Set<Note|undefined> {
    return references(note, this.notes, this.dictionary);
  }

  /**
   * Alias of references
   */
  public getReferencesOf(note: Note) : Immutable.Set<Note|undefined> {
    return this.references(note);
  }
}

export default Notebook;