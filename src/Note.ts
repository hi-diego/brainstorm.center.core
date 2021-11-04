import Immutable from 'immutable';
import Mention from './Mention';
console.log("Mention", Mention);
import NotebookItem from './NotebookItem';

/**
 * Note class is the holder of Mentions.
 * @class
 */
class Note extends NotebookItem {

  public title: string;
  public content: string = '';
  public mentions: Immutable.Set<Mention>;

  constructor (title: string, content: string, uuid?: string, mentions?: Immutable.Set<Mention>, createdAt?: Date, modifiedAt?: Date) {
    super(uuid, createdAt, modifiedAt);
    this.mentions = mentions || Immutable.Set<Mention>();
    this.title = title;
    this.content = content;
  }

  /**
   * Return all the words in the content.
   */
  public words (prev: boolean = false) : Immutable.Set<string> {
    const words = this.content.toLowerCase().replace(/((\W)\s)/g, '').split(/\s+/g) || [];
    return Immutable.Set<string>(words);
  }

  /**
   * Return all the words in the content.
   */
  public clone (from?: Note) : Note {
    return new Note(this.title, this.content, (from && from.uuid) || this.uuid, this.mentions, this.createdAt, this.modifiedAt);
  }
}

export default Note;