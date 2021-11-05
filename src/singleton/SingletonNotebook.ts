import Notebook from './../Notebook';
import Note from './../Note';
import { update } from '../Utils';

/**
 * 
 *
 */
class SingletonNotebook_ extends Notebook {
  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public update(note: INote, oldWords?: Immutable.Set<string>) : Notebook {
    const notebook = super.update(note, oldWords);
    this.dictionary = notebook.dictionary;
    this.notes = notebook.notes;
    return this;
  }
  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   */
  public create(title: string, content?: string) : INote {
    const oldNote = this.notes.get(title.toLowerCase());
    if (!oldNote) {
      const note = new Note(title, content || '');
      this.update(note);
      return note;
    }
    const oldWords = oldNote.words();
    oldNote.content = content || '';
    this.update(oldNote, oldWords);
    return oldNote;
  }
}
/**
 *
 */
export const SingletonNotebook = new SingletonNotebook_();
