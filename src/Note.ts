import Immutable from 'immutable';
import Mention from './Mention';
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
    const words = this.content.split(' ');
    return Immutable.Set<string>(words);
  }
}

export default Note;