import Notebook from './../Notebook';
import Note from './../Note';

class SingletonNotebook_ extends Notebook {
  public update (note: Note): Notebook {
    const notebook = super.update(note);
    // console.log(note.content, this.dictionary.toArray(), notebook.dictionary.toArray());
    this.dictionary = notebook.dictionary;
    this.notes = notebook.notes;
    return this;
  }
}
export const SingletonNotebook = new SingletonNotebook_();
