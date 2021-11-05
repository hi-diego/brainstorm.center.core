import { default as Notebook_ } from './../Notebook';
import Note from './Note';
import INote from './../INote';
import { update } from '../Utils';
/** 
 *
 * @class SingletonNotebook
 */
class SingletonNotebook extends Notebook_ {
  /**
   * Add or Update the given note to the notebook:
   * this will recalculate all the mentionses as well.
   * @member
   * @function
   */
  public update(note: INote, oldWords?: Immutable.Set<string>) : Notebook_ {
    const notebook = super.update(note, oldWords);
    this.dictionary = notebook.dictionary;
    this.notes = notebook.notes;
    return this;
  }
}
/**
 *
 */
export const Notebook = new SingletonNotebook();
