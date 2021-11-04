import Immutable from 'immutable';
import Note from './Note';
import Mention from './Mention';

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
export function updateDictionary(note: Note, dictionary: Immutable.Map<string, Immutable.Set<string>>, oldNote: Note): Immutable.Map<string, Immutable.Set<string>> {
  var dic = Immutable.Map<string, Immutable.Set<string>>(dictionary); // cloning the map. TODO: convert this var to const.
  const words = wordsDiff(oldNote.words(), note.words());
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
export function mentions(note: Note, notes: Immutable.Map<string, Note>) : Immutable.Set<Mention> {
  return notes
    .filter((v, k) => note.words().has(k))
    .toSet()
    .map(n => new Mention(note, n, n.title))
    .concat(note.mentions);
}

/**
 * Return all the notes that reference this note by the title.
 */
export function references (note: Note, notes: Immutable.Map<string, Note>, dictionary: Immutable.Map<string, Immutable.Set<string>>) : Immutable.Set<Note|undefined> {
  return dictionary.get(note.title, Immutable.Set<string>()).map(title => notes.get(title))
}
