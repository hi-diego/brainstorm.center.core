import Immutable from 'immutable';
import Note from './Note';
import INote from './INote';
import Mention from './Mention';
import Notebook from './Notebook';

export type Words = {
  gone: Immutable.Set<string>;
  new: Immutable.Set<string>;
};

/**
 *
 */
export function wordsDiff(a: Immutable.Set<string>, b: Immutable.Set<string>): Words {
  return {
    gone: a.subtract(b),
    new: b.subtract(a)
  }
}

/**
 * Generate a new random uuid
 */
export function uuid () : string {
  var date = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line
    var random = (date + Math.random() * 16) % 16 | 0
    date = Math.floor(date / 16)
    // eslint-disable-next-line
    return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16)
  })
  return uuid
}


/**
 * Recalculate the given dictionary for the given note.
 */
export function updateDictionary(note: Note, dictionary: Immutable.Map<string, Immutable.Set<string>>, oldWords: Immutable.Set<string>): Immutable.Map<string, Immutable.Set<string>> {
  var dic = Immutable.Map<string, Immutable.Set<string>>(dictionary); // cloning the map. TODO: convert this var to const.
  const words = wordsDiff(oldWords, note.words());
  words.gone.forEach((word: string) => {
    const set = (dic.get(word, Immutable.Set<string>())).delete(note.title)
    if (set.isEmpty()) dic = dic.delete(word);
    else dic = dic.set(word, set);
  })
  words.new.forEach((word: string) => {
    const set = (dic.get(word, Immutable.Set<string>())).add(note.title)
    dic = dic.set(word, set);
  })
  return dic;
}

/**
 * Return all the title notes that this note mentions in its content.
 */
export function mentions(note: INote, notes: Immutable.Map<string, INote>) : Immutable.Set<Mention> {
  // console.log(notes.toArray(), note.words().toArray());
  return notes
    .filter((v, k) => note.words().has(k.toLowerCase()))
    .toSet()
    .map(n => new Mention(note, n, n.title.toLowerCase()));
    //.concat(note.mentions);
}

/**
 * Return all the notes that reference this note by the title.
 */
export function references (note: INote, notes: Immutable.Map<string, INote>, dictionary: Immutable.Map<string, Immutable.Set<string>>) : Immutable.Set<INote|undefined> {
  return dictionary.get(note.title.toLowerCase(), Immutable.Set<string>()).map(title => notes.get(title.toLowerCase()))
}


/**
 * Add or Update the given note to the notebook:
 * this will recalculate all the mentionses as well.
 */
export function update(notebook: Notebook, note: INote, oldWords?: Immutable.Set<string>) : Notebook {
  const oldNote = notebook.get(note.title);
  const dictionary = notebook.updateDictionary(note, oldWords || (oldNote ? oldNote.words() : Immutable.Set<string>([])));
  const notes = notebook.notes.set(note.title.toLowerCase(), note);
  return new Notebook(notes, dictionary);
}

export function clone (from: INote) : INote {
  return new Note(from.title, from.content, from.uuid, from.createdAt, from.modifiedAt);
}


export function words (note: INote) : Immutable.Set<string> {
  const words = note.content.toLowerCase()
    .replace(/((\W)(\s|$))/g, '')
    .split(/\s+/g)
    || [];
  return Immutable.Set<string>(words);
}