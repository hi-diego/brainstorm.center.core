import Notebook from './../Notebook';
import Note from './../Note';

class SingletonNotebook extends Notebook {
  public update (note: Note): Notebook {
    const notebook = super.update(note);
    this.dictionary = notebook.dictionary;
    this.notes = notebook.notes;
    return this;
  }
}

export default new SingletonNotebook();
